const mongoose = require('mongoose')
const validator = require('validator')

const signupschema = new mongoose.Schema({
    Firstname:{
            type:String,
            required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
                res.send('Enter correct format of your email')
        }
    },
    password:{
            type:String,
            required:true,
            minlength:7
    }

})

const signupcollection = mongoose.model('signupcollection',signupschema)
module.exports=signupcollection