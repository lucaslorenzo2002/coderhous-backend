const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userCollection = "users";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'porfavor complete este campo']
    },
    password:{
        type: String,
        required: [true, 'please write a password'],
        minlength: [8, 'porfavor complete este campo']
    },
    email:{
        type: String,
        required: [true, 'porfavor complete este campo'],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'mail invalido',
          ] 
    }
})


const User = mongoose.model(userCollection, userSchema);
module.exports = User