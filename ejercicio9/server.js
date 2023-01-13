const express = require('express');
const app = express();
const path = require('path');

const { Server: HttpServer } = require('http'); 
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const Router = require('./routes/router');

//MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api', Router)

//MONGO
const messageCrud = require('./container/mongooseContainer');
const connection = require('./config/mongoConfig')

connection
.then(() => console.log('mongoose conectado'))
.catch((err) => console.log(err))

const messagesContainer = new messageCrud(connection);


//HANDLEBARS
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//FAKER
const productoFaker = require('./container/fakerContainer')
const generarProductos = new productoFaker();
        

let products = [];
products.push(generarProductos.productosLoop())


app.get('/productos', (req, res) => {
    res.render('index', {
        products
    })
})

Router.get('/productos-test', (req, res) => {
    res.json(products)
})

//UTILS
const util = require('util');

function print(objeto){
    console.log(util.inspect(objeto, false, 12, true));
}






//SOCKET
io.on('connection', socket => {
    console.log(`${socket.id} se ha conectado`);

    socket.on('message',  async(data) => {

        await messagesContainer.postMessage(data);

        io.sockets.emit('new message', await listarMensajesNormalizados(), await compresionDeMensajes())  
    })

    socket.on('chat: typing', (data) => {

        socket.broadcast.emit('typing', data)
    })
})


//NORMALIZE
        const { normalize, schema } = require('normalizr');

        const authorSchema = new schema.Entity('author', {}, {idAttribute: 'mail'})

        const messageSchema = new schema.Entity('message', {author: authorSchema}, {idAttribute: 'id'})
    
        const chat = new schema.Entity('chat', {messages: [messageSchema]}, {idAttribute: 'id'}) 
    
        const chatNormalizado = (mensajesConId) => {
            return normalize(mensajesConId, chat)
        }; 
        
        

    const listarMensajesNormalizados = async() => {
            const mensajes = await messagesContainer.readMessages();
            return chatNormalizado({id:'mensajes', messages: mensajes})
        }

    const compresionDeMensajes = async() => {
        const mensajes = await messagesContainer.readMessages();
        const mensajesNormalizados = chatNormalizado({id:'mensajes', messages: mensajes});

        const mensajesLength = JSON.stringify(mensajes).length;
        const mensajesNormalizadosLength = JSON.stringify(mensajesNormalizados).length;

        return mensajesNormalizadosLength * 100 / mensajesLength
    }

    

//CONEXION AL PUERTO
const PORT = 8080

const server = httpServer.listen(process.env.PORT || PORT, () => {
    console.log(` server listening on PORT: ${PORT}`)
})

server.on('error', err => console.log(err))



