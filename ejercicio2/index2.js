const fs = require('fs');

class Contenedor {
    constructor(file){
        this.file = file
    }

    
    static async writeFile(data){
        try{
            await fs.promises.writeFile(archivo.file, JSON.stringify(data, null, 2));
            console.log('producto agregado');
        }catch(err){
            throw new Error('hubo un error: ' + err)
        }
    }

     static async getAll (){
        try{
            let productos =  await fs.promises.readFile(archivo.file, 'utf-8');
            return JSON.parse(productos); 
            } catch(err){
                if(err.message.includes('no such file or directory')) return [];
                console.log('error: ' + err);
        }
    }
    
    static async save(obj){
        let productos = await this.getAll();
        try{
            let newId;
            productos.length === 0 ? newId = 1 : newId = productos[productos.length - 1].id + 1
            let newObj = {id: newId, ...obj}
            productos.push(newObj)
            await Contenedor.writeFile(productos)
            return newObj.id;
    } catch(err){
            throw new Error('hubo un error: ' + err)
        }  
    } 

    static async getById (id){
        let productos = await this.getAll()
        try{
        const productoID = productos.find(producto => producto.id === id)
            id ? console.log( productoID) : console.log(null); 
        }catch(err){
            throw new Error('hubo un error: ' + err)
        }
    }

    static async deleteAll (){
        try {
            await fs.promises.writeFile(archivo.file, [])
        } catch(err){
            throw new Error('hubo un error: ' + err)
        }
    }

    static async deleteById (id){
        let productos = await this.getAll()
        try{
            productos = productos.filter(producto => producto.id !== id)
            await fs.promises.writeFile(archivo.file, JSON.stringify(productos, null, 2))
        }catch(err){
            throw new Error('hubo un error: ' + err)
        }
    }
    }

    const archivo = new Contenedor('./productos.txt')

    const test = async () => {
        let saveObj = await Contenedor.save(
            {
                producto: "fanta",
                tamano: "3 litros",
                stock: 20,
                precio: 500,
                thumbail: "https://http2.mlstatic.com/D_NQ_NP_632382-MLA49973524416_052022-O.webp"
            }
        )
  
//await Contenedor.deleteAll();
//await Contenedor.deleteById();
//let getById = await Contenedor.getById();
let getAll = await Contenedor.getAll();

//console.log(getById);
console.log(getAll);
console.log(saveObj);  
}
test()






