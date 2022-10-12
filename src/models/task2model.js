const mongoose = require('mongoose')
const validator = require('validator')
const signcollections = require('./signmodel')

const task2schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:false
    },
    idd:{
        type:Number,
        required:true
    },
    Owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'signcollections'             // referncing user collection
    }
},{timestamps:true})

const task2collection = mongoose.model("task2collection",task2schema)

module.exports = task2collection