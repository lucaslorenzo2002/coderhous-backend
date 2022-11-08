const express = require('express')
const Contenedor = require('./contenedor')


const app = express()
const RUTA_1 = '/productos'
const RUTA_2 = '/productorandom'
const PORT = 3000


    const productosContenedor = new Contenedor('productos.txt')

     const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

      app.get(RUTA_1, async (req, res) => { 
        const productos = await Contenedor.getAll()
        res.send(productos);
     })  

    

    app.get(RUTA_2, async (req, res) => {
        const productos = await Contenedor.getAll()
        const productoRANDOM = productos.find((producto) => producto.id === randomNumber(1, 3))
        res.send(productoRANDOM)
    })   

    
     const server = app.listen(process.env.PORT || PORT, () => {
        console.log(` server listening on PORT: ${PORT}`);
    })

    server.on('error', err => console.log(err))  

