const mongoose = require('mongoose')
const validator = require('validator')
const users = mongoose.model('users',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true
    }
    
})

module.exports=users