const {faker} = require('@faker-js/faker');
faker.locale = 'es'


class productosFaker{
    constructor(){

    }

    productosLoop (cant = 5){
        const productosFaker = []
        for (let i = 0; i < cant; i++) {
            const productoNuevo = generarProducto();
            productosFaker.push(productoNuevo)
        }
        return productosFaker
    }
    
}

const generarProducto = () => {
    return{
        producto: faker.commerce.product(),
        precio: faker.commerce.price(),
        file: faker.image.abstract()
    }
}


module.exports = productosFaker