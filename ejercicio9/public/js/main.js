const socket = io();

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
    
    socket.on('new message', (data) => {
        const html = data.map(msj => {
            return `
            <div class='msj'>
                <p><strong class="mail">${msj.mail}</strong> <span class="date">${msj.date}</span>: <span class="msj">${msj.message}</span></p> 
            </div>
            `
        })
        actions.innerHTML = ''
        outputChat.innerHTML = html 
    }) 
    
    socket.on('typing', data => {
        actions.innerHTML = `<p>
        <strong>${data}:</strong> is typing...
        </p>`
    })
