const mongoose =require('mongoose')

let fruitSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }

})
let Fruit = mongoose.model('Fruit',fruitSchema)

module.exports = {Fruit,fruitSchema}