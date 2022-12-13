const { knex } = require('knex');

class productosMariaDB {
    constructor(options){
        this.knex = knex(options)
    }

    createTable(){
        return this.knex.schema.dropTableIfExists('productos')
            .finally(() => {
                return this.knex.schema.createTable('productos', t => {
                    t.string('producto', 25).notNullable
                    t.string('file').notNullable
                    t.float('precio')
                    t.increments('id').primary()
                })
            })
    }

    insert(data){
        return this.knex('productos').insert(data)
    }

    read(){
        return this.knex('productos').select('*')
    }

    delete(id){
        return this.knex('prodcutos').where('id', '>', id).del()
    }

    update(id, obj){
        return this.knex('productos').where('id', '=', id).update(obj)
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = {
    productosMariaDB
}