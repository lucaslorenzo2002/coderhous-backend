const socket = io();


//DOM
const producto = document.querySelector('#producto');
const precio = document.querySelector('#precio');
const file = document.querySelector('#file');
const form = document.querySelector('#form');
const output = document.querySelector('#output');
const login = document.querySelector('#login');


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
        const html = data.map(prod => {
            return `
            <div class='prod'>
                <p><strong class="producto">${prod.producto}</strong> <span class="precio">${prod.precio}</span>: <span class="file">${prod.file}</span></p> 
            </div>
            ` 
        })
        output.innerHTML = html
    }) 
    


