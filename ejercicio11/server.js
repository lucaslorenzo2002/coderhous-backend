const express = require('express');
const path = require('path');

const app = express();

require('dotenv').config()

const { Server: HttpServer } = require('http'); 
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const IO = new IOServer(httpServer);

//MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//app.use('/api', Router)

//HANDLEBARS
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//PASSPORT
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')

//CONEXION MONGOOSE
const connection = require('./config/mongooseConfig');
connection
.then(() => console.log('mongoose conectado'))
.catch((err) => console.log(err))

//REQUIRE A CLASES DE MONGOOSE
const  UserCrud  = require('./container/usersContainer');

//CONTENEDOR DE MONGOOSE
const usersContainer = new UserCrud(connection);

//PERSISTENCIA POR MONGODB
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

//HASH PASSWORD
const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

//MIDDLEWARE SIGNUP
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const{ email } = req.body

    if( !username || !email || !password ){
        console.log('completa todos los campos');
        return done(null, false)
    }

    const userAlredyRegistered = await usersContainer.readUser(username)

    if(userAlredyRegistered){
        console.log('usuario en uso');
        return done(null, false)
    }  

    if(password.length < 8){
        console.log('la contrasenia debe tener al menos 8 caracteres');
        return done(null, false)
    }

    const newUser = {
        username,
        email,
        password: hashPassword(password)
    }

    usersContainer.createUser(newUser)
    
    done(null, newUser);
}))

//MIDDLEWARE LOGIN
passport.use('login', new LocalStrategy(
   async ( username, password, done) => {

    const user = await usersContainer.readUser(username)

    if(!user){
        return done('el usuario no existe')
    }

    if(user.password !== password){
        return done('contrasenia incorrecta')
    }

    return done(null, user)

    }
)) 

passport.serializeUser((user, done) => {
    return done(null, user.username)
})

passport.deserializeUser((username, done) => {
    const user = usersContainer.readUser(username);
    return done(null, user)
})

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, 
        mongoOptions: advancedOptions,
        collectionName: 'sessions',
        ttl: 60000
}),

    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:60000
    }
}))
   
app.use(passport.initialize())
app.use(passport.session())

//
const requireAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}

//METODOS
app.get('/register', (req, res) => {
    
    res.render('register')
    
})

app.post('/register', passport.authenticate('signup', {failureRedirect: '/failregister', successRedirect: '/home'}))

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/home')
    }
    
    res.render('login')
    
})

app.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/home'}))

app.get('/home', requireAuthentication,(req, res) => {
    
    res.render('index')
    
})

app.get('/', (req, res) => {

    res.redirect('/home')

})

app.get('/failregister', (req, res) => {

    res.render('failregister')

})

app.get('/faillogin', (req, res) => {

    res.render('faillogin')

})

app.get('/logout', (req, res) => {
    req.logout(err => {
        res.redirect('/login')
    })
})

const products = []

//SOCKETS
IO.on('connection', socket => {
    console.log(`${socket.id} se ha conectado`);

    socket.on('producto',  (data) => {

        products.push(data)
        IO.sockets.emit('new product', products)   
    })
 
})

//CONEXION AL PUERTO
const PORT = 8080

const server = httpServer.listen(process.env.PORT || PORT, () => {
    console.log(` server listening on PORT: ${PORT}`)
})

server.on('error', err => console.log(err))