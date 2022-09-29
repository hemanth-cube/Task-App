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
userSchema.statics.findByCredentials = async(email,password=>{

        const found = studentcollection.findOne({email})
        if(!found){
           throw new Error('Email Not found')
        }
        bcrypt.compare(password,found.password).then((result)=>{
                if(result==true)
                    res.send('sucess')
                else
                    res.send('unable to login')
        }).catch((err)=>{
            res.status(400).send(err)
        })


})

// userSchema.pre('save',async function(next){     // Before saving into database
//     const student = this
//     console.log('just before saving')
//     if(student.isModified('name')){
//             student.name = await bcrypt.hash(student.name,8)
//     }
//     next()
// })     
const studentcollection = mongoose.model('studentcollection',userSchema)




module.exports=studentcollection