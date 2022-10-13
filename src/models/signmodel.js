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
    },
    tokens:[{
            token:{
                type:String,
                required:true
            }
    }],
    description:{
        type:String,
        required:true
    }
    // avatar:{
    //     type:Buffer
    // }

},{timestamps:true})

signupschema.virtual('virtualtask',{
    ref:'task2collection',        // Task collection
    localField:'_id',           // Acutal Owners id
    foreignField:'Owner'        // Tasks Owner id
})
//signupschema.methods.toJSON=function()  or
signupschema.methods.getProfile = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password        // Hiding password
    delete userObject.tokens          // Hiding tokens
    return userObject
}
// signupschema.statics.findByCredentials=(username,password)=>{   
   



const signcollections = new mongoose.model('signcollections',signupschema)
module.exports=signcollections