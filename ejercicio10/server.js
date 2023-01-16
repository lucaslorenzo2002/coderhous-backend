const express = require('express');
const path = require('path');

const app = express();

require('dotenv').config()

const { Server: HttpServer } = require('http'); 
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const IO = new IOServer(httpServer);

const Router = require('./routes/router');

//MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api', Router)

//HANDLEBARS
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//PERSISTENCIA POR MONGODB
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

//FILE STORE
const session = require('express-session');
const FileStore = require('session-file-store')(session)

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, 
        mongoOptions: advancedOptions,
        collectionName: 'sessions',
        ttl: 600
}),

    secret: 'esto es un secreto',
    resave: false,
    saveUninitialized: false
}))

let products = []

//SOCKET
IO.on('connection', socket => {
    console.log(`${socket.id} se ha conectado`);

    socket.on('producto',  (data) => {

        products.push(data)
        IO.sockets.emit('new product', products)   
    })
 
})

//ROUTES MIDDLEWARES
const auth = (req, res, next) => {
    if(req.session?.nombre){
        return next()
    }else{
        res.redirect('/login')
    }

}

//METODOS
app.get('/login', (req, res) => {
    
    if(!req.session.nombre){
        res.render('login')
    }else{
        res.redirect('/productos')
    }
    
})

app.post('/login', (req, res) => {
    
    let nombre = req.body.nombreLogin;

    req.session.nombre = nombre

    res.redirect('/productos')
})



app.get('/productos', auth, (req, res) => {

        const usuario = req.session?.nombre

        res.render('index', {
            usuario
        })
}) 

app.get('/logout', (req, res) => {

    const nombre = req.session.nombre

    req.session.destroy(err => {
        if(!err) res.render('logout', {
            nombre
        })
        else res.send({status: 'logout error', body: err})
    }) 

})

//CONEXION AL PUERTO
const PORT = 8080

const server = httpServer.listen(process.env.PORT || PORT, () => {
    console.log(` server listening on PORT: ${PORT}`)
})

server.on('error', err => console.log(err))