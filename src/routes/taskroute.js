
const express = require('express')

const task = require('../models/task')
const router = new express.Router()
router.get('/task',async (req,res)=>{
    try{
        await task.find({})
    }
    catch(err){
        res.status(400).send("error")
    }
   
    res.send(data)
})
router.post('/task',async(req,res)=>{
    const t = new task(req.body)
    try{
        await t.save()     
    }
    catch(err){
            console.log(err)
    }
   
})

module.exports=router