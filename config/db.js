const mongoose =require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/fruits');
let db = mongoose.connection;

module.exports=db;