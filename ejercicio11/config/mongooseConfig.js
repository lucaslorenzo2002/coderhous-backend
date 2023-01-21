const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://127.0.0.1:27017/desafio11',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = connection