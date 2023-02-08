
const socket = io();

//SCHEMAS


const authorSchema = new normalizr.schema.Entity('author', {}, {idAttribute: 'mail'})
const messageSchema = new normalizr.schema.Entity('message', {author: authorSchema}, {idAttribute: 'id'})
const Chat = new normalizr.schema.Entity('chat', {messages: [messageSchema]}, {idAttribute: 'id'})  

//DOM
const chat = document.querySelector('#chat');
const message = document.querySelector('#message');
const user = document.querySelector('#user');
const outputChat = document.querySelector('#outputChat');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const edad = document.querySelector('#edad');
const avatarUrl = document.querySelector('#urlAvatar');
const alias = document.querySelector('#alias');
const actions = document.querySelector('#actions');
const outputCompresion = document.querySelector('#compresion');

//EVENTOS
chat.addEventListener('submit', (e) => {
    e.preventDefault()
    let objeto = {
        author: {
            mail: user.value,
            nombre: nombre.value,
            apellido: apellido.value,
            edad: edad.value,
            alias: alias.value,
            avatar: avatarUrl.value,
        },
        message: message.value,
        id: 1
    }
    socket.emit('message', objeto)
    })
    
    message.addEventListener('keypress', () => {
        socket.emit('chat: typing', user.value)})
    
    socket.on('new message', (data, compresion) => {
        const objDenormalizado = normalizr.denormalize(data.result, Chat, data.entities)
        const dataMsj = objDenormalizado.messages
        const html = dataMsj.map(msj => {
            return `
            <div class='msj'>
                <p><strong class="mail">${msj.author.mail}</strong> <span class="date">${msj.fyh}</span>: <span class="msj">${msj.message}</span></p> 
            </div>
            `
        })
        actions.innerHTML = ''
        outputChat.innerHTML = html  
        outputCompresion.innerHTML = `<p>%${JSON.stringify(compresion)}</p>`
    }) 
    
    socket.on('typing', data => {
        actions.innerHTML = `<p>
        <strong>${data}:</strong> is typing...
        </p>`
    })

