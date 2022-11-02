const fs = require('fs')

class Contenedor {
    constructor(file){
        this.file = file
       }

       
       //ESTA ES LA FUNCION QUE HICE PARA QUE LE AGREGUE EL ID
       /* static async save(obj){
           let productos = this.getAll() 
           try{

            let newId;
            productos.length = 0 ? newId = 1 : newId = productos[productos.length-1].id + 1
            let newObj = {...obj, id: newId}
            productos.push(newObj)
            await fs.promises.writeFile(archivo.file, JSON.stringify(productos, null, 2))
          // return newObj.id;
    } catch(err){
            throw new Error('hubo un error: ' + err)
        }
       } */

       //ESTA FUNCION LA HAGO PARA QUE SOLAMENTE ME CARGUE EL OBJETO
       static async save(obj){
        try{
            await fs.promises.writeFile(archivo.file, JSON.stringify(obj, null, 2));
            console.log('producto agregado');
        }catch(err){
            throw new Error('hubo un error: ' + err)
        }
       }

       static async getAll (){
        try{
            let productos =  await fs.promises.readFile(archivo.file, 'utf-8');
            return(JSON.parse(productos)); 
            
        } catch(err){
            throw new Error('FileNotFoundError:' + err + 'No such file or directory')
        }
       }

       static async getById (id){
           let productos = await this.getAll()
        try{
           const productoID = productos.find(producto => producto.id === id)
            id ? console.log( productoID) : console.log(null); 
        }catch(err){

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
 Contenedor.save([{

    producto: "coca-cola",
    tamano: "2,25 litros",
    stock: 25,
    precio: 475,
    thumbail: "https://http2.mlstatic.com/D_NQ_NP_632382-MLA49973524416_052022-O.webp"
},{
    producto: "pepsi",
    tamano: "2 litros",
    stock: 40,
    precio: 400,
    thumbail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/219/229/products/40-51b4d2d07bc680935861f085d186fcdf1-ce8ed1c3777262d54916215172296748-50-0.jpg"
}
])  

//Contenedor.deleteById()
//Contenedor.getById() 
//Contenedor.deleteAll()


