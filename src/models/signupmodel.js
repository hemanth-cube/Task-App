const mongoose = require('mongoose')
const validator = require('validator')

const signupschema = new mongoose.Schema({
    firstname:{
            type:String,
            required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
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

const signupcollections = new mongoose.model('signupcollections',signupschema)
module.exports=signupcollections