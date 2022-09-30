const mongoose = require('mongoose')
const validator = require('validator')

const task2schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const task2collection = mongoose.model("task2collection",task2schema)

module.exports = task2collection