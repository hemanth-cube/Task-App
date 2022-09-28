const express = require('express')
const users = require('../models/user')
const router = new express.Router()
router.post('/users',async(req,res)=>{
    const user = new users(req.body)
    try{
        await user.save()
        res.send(user)
    }
    catch(err){
            res.send({
                status:400,
                message:"query failed",
            })
    }
})

router.get('/users',(req,res)=>{
   users.find({}).then((result)=>{
    res.log(result)
   }).catch((err)=>{
    res.status(400).send(err)
   })
    // try
    // {   const usr = await users.find({})
    //     res.send(usr)
    // }
    // catch(er){
    //     res.send(er)
    // }
    // res.send("Inside of getting users")
})

module.exports = users

