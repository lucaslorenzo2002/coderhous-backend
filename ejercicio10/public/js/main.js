const socket = io();


//DOM
const producto = document.querySelector('#producto');
const precio = document.querySelector('#precio');
const file = document.querySelector('#file');
const form = document.querySelector('#form');
const output = document.querySelector('#output');
const login = document.querySelector('#login');
const desloguearse = document.querySelector('#desloguearse');



//EVENTOS
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let objeto = {
        producto: producto.value,
        precio: precio.value,
        file: file.value
    }
    socket.emit('producto', objeto)
    })
    
    
    socket.on('new product', (data) => {
        const html = data.map(msj => {
            return `
            <div class='msj'>
                <p><strong class="producto">${msj.producto}</strong> <span class="precio">${msj.precio}</span>: <span class="file">${msj.file}</span></p> 
            </div>
            ` 
        })
        output.innerHTML = html
    }) 
    
desloguearse.addEventListener('click', () => {
    window.location.href = '/login'
})