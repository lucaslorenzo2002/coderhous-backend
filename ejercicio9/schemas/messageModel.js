const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    author:{
        mail:{
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        edad: {
            type: Number,
            required: true
        },
        avatar: {
            type: String
        },
        alias: {
            type: String,
            required: true
        }
    },
    message:{
        type: String,
        required: true
    },
    fyh: {type: Date},
})

module.exports = mongoose.model('mensaje', messageSchema)