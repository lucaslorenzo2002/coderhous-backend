const User = require('../schemas/userModel');

class UserCrud{
    constructor(connection){
        this.connection = connection
    }

    async createUser(user){
        try{
            await User.create(user);
            console.log('usuario creado');
        }catch(err){
            console.log(err)
        }
    }

    async readUser(username){
        try{
            const data = await User.findOne({username});
            return data
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = UserCrud