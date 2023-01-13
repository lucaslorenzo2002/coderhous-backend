const  Message  = require('../schemas/messageModel')


class messageCrud{
    constructor(connection){
        this.connection = connection
    }

    async postMessage(message){
        try{
            const data = await Message.create(message);
            return data        
        }catch(err){
            console.log(err)
        }
    }

    async readMessages(){
        try{
            const find = await Message.find({}, {_id: 0, __v: 0});
            const stringifiedData = JSON.stringify(find);
            const parsedData = JSON.parse(stringifiedData);

            let newId = 1;
            let newDate = new Date().toLocaleString()

            parsedData.forEach(e =>  e.id = newId++ )
            parsedData.forEach(e => e.fyh = newDate)
    
            return parsedData
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = messageCrud