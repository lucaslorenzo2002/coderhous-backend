const NEW_BOOK_NAME = prompt("ingrese el nombre de un nuevo libro");
const NEW_BOOK_AUTHOR = prompt("ingrese el autor del libro");

const NEW_PET = prompt("ingrese una nueva mascota")

class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre,
        this.apellido = apellido, 
        this.libros = libros,
        this.mascotas = mascotas
    }
    
    static getFullName = (nombre, apellido) => {
        return(`mi nombre es ${nombre} ${apellido}`)
    };
    
    static countMascotas = (mascotas) => {
        return(`${mascotas.length}`); 
    };

    static getBooksName = (book1, book2) => {
        return(`${book1.nombre}, ${book2.nombre}`);
    };

    static addBook = (nombre, autor) => {
        const book = {
            nombre: nombre,
            autor: autor
        }
        Usuario1.libros.push(book)
    };
    
    static addPet = (pet) => {
        Usuario1.mascotas.push(pet)
    };

}


const Usuario1 = new Usuario(
    "Lucas",
    "Lorenzo",
    [
        {
        nombre: "harry potter",
        autor: "JK Rowling"
    },{
        nombre: "el senior de los anillos",
        autor: "JRR Tolkien"
    }
    ],
    ["perro", "gato", "pez", "cotorra"]
)

 
Usuario.addPet(NEW_PET); 

Usuario.addBook(NEW_BOOK_NAME, NEW_BOOK_AUTHOR); 

console.log(Usuario.getFullName(Usuario1.nombre, Usuario1.apellido)); 

console.log(Usuario.countMascotas(Usuario1.mascotas)); 

console.log(Usuario.getBooksName(Usuario1.libros[0], Usuario1.libros[1]));



