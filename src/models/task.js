const mongoose = require('mongoose')
const validator = require('validator')

const task = mongoose.model('task',{            // New Collection into Tdatabase
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        required:true
    }
})

module.exports=task