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

// signupschema.statics.findByCredentials=(username,password)=>{   
   
//     const found = signcollections.findOne({username:{$eq:username}})
//     console.log(found)
//     if(!found){
//         throw new Error('username not found!')
//     }
//     isMatched =  bcrypt.compare(password,found.password)
//     console.log(isMatched)
//     if(!isMatched){
//         throw new Error('unable to login') 
//     }  
//     return found
// }


const signcollections = new mongoose.model('signcollections',signupschema)
module.exports=signcollections