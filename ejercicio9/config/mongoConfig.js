const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb+srv://lucas:Marruecos02@cluster0.t9viw63.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = connection