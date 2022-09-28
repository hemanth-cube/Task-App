const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt =require('bcryptjs')
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },

    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                console.log("Enter valid emaail ")
            }
        }
    },
    branch:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function(next){     // Before saving into database
    const student = this
    console.log('just before saving')
    if(student.isModified('name')){
            student.name = await bcrypt.hash(student.name,8)
    }
    next()
})     
const studentcollection = mongoose.model('studentcollection',userSchema)




module.exports=studentcollection