const express = require('express')
const task2collection = require('../models/task2model')
const router = new express.Router()
const auth = require('../middleware/auth')
const signcollections = require('../models/signmodel')
router.post('/createpost',auth,async(req,res)=>{
    const data = new task2collection({
    ...req.body,
    Owner:req.user._id
    })
    try{
        const send = await data.save()
        console.log(send)
        res.send({
            status:200,
            message:send
        })
    }
    catch(err){
        res.send({
            status:400,
            message:err
        })
    }
})

router.get('/listall',async(req,res)=>{
    try{
        const alldata = await task2collection.find({})    
        res.status(200).send(alldata)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.get('/usertasks',auth,async(req,res)=>{
    
    req.user.populate('virtualtask').execPopulate((err,data)=>{
        if(err)
        {
            return res.send({
                status:400,
                message:err
            })
        }
        console.log(data.virtualtask)
        res.send(data.virtualtask)
    })
    // res.send(req.user.virtualtask)


    

})
router.get('/gettasks',async(req,res)=>{
    // console.log(req.params._id)
    const task = await task2collection.findById('6343b037b0273f4060413947')
    await task.populate('Owner').execPopulate()
    res.send(task.Owner)
})
// get tasks based on user request
router.get('/specifictasks',auth,async(req,res)=>{
    // req.query.completed
    // const match = {}
    // console.log(req.query.completed)
    // if(req.query.completed)     // takes string -- true or false
    //     match.completed = req.query.completed ==='true'
    console.log(req.query.sortBy)
    const sort={}
    const parts = req.query.sortBy.split('_')       // Here we append array to sort because we are giving equalto as query 
    sort.parts[0] = parts[1] === 'asc' ? 1 : -1       // here we pass quatlto as query inorder to split 
    
    try{
            const us = await req.user.populate({
                path:'virtualtask',
                match:{             // Its a match document with specific field
                    description:req.query.completed==='true'
                },

                // pagination --> Query results
                // options:{
                //     // limit:parseInt(req.query.limit),
                //     sort
                //     // skip:parseInt(req.query.skip)    // skips first n elements and shows limit documents
                // }         
            }).execPopulate()
            res.send(req.user.virtualtask)      // Authenticated user
    }
    catch(err){     
        console.log("err")
        res.send(err)
    }
   
})
router.get('/titleview/:id',async(req,res)=>{
    const _id = req.params.id
    // console.log('title id ',_id)
    try{
        const data = await task2collection.findById(_id)
        res.send({
            status:200,
            message:data
        })
    }
    catch(err){
        res.send({
            status:400,
            message:err
        })
    }
})
router.delete('/deleteTask/:id',async(req,res)=>{
    
    try{
        console.log(req.params.id)
        const task = await task2collection.findById(req.params.id)
        await task.remove()
        res.send(task)
    }
   catch(err){
    res.send({
        status:400,
        message:err
    })
   }
    
})
module.exports = router

