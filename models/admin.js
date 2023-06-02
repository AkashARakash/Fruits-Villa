const mongoose =require('mongoose')

let adminSchema = mongoose.Schema({
    adminname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
let Admin = mongoose.model('Admin',adminSchema)

module.exports = {Admin,adminSchema}