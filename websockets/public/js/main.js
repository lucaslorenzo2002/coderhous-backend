const socket = io()

const form = document.querySelector('#form');
const producto = document.querySelector('#producto');
const precio = document.querySelector('#precio');
const file = document.querySelector('#file');
const output = document.querySelector('#output');
const chat = document.querySelector('#chat');
const message = document.querySelector('#message');
const user = document.querySelector('#user');
const outputChat = document.querySelector('#outputChat');
const actions = document.querySelector('#actions')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let objeto =  {
        producto: producto.value,
        precio: precio.value,
        file: file.value
    }
    socket.emit('product', objeto)
})

socket.on('new product', (data) => {
    if(data.length === 0){
        let html = `
        <div>
            <h3>no hay productos</h3>
        </div>
        `
        output.innerHTML = html
    }else{
        let html = data.map(prod => {
            return `
            <div class='item'>
                <h4>${prod.producto}</h4>  <p>$${prod.precio}</p> <p>${prod.file}</p> 
            </div>
            `
        })
        output.innerHTML = html
    }
})

chat.addEventListener('submit', (e) => {
e.preventDefault()
let objeto = {
    mail: user.value,
    message:message.value,
    date: new Date().toLocaleString()
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