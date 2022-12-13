const { knex } = require('knex');

class mensajesSQLite {
    constructor(options){
        this.knex = knex(options)
    }

    createTable(){
        return this.knex.schema.dropTableIfExists('mensajes')
            .finally(() => {
                return this.knex.schema.createTable('mensajes', t => {
                    t.string('mail').notNullable
                    t.string('message').notNullable
                    t.date('date')
                    t.increments('id').primary()
                })
            })
    }

    insert(data){
        return this.knex('mensajes').insert(data)
    }

    read(){
        return this.knex('mensajes').select('*')
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = {
    mensajesSQLite
}