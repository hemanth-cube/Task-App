const express = require('express')
const signcollections = require('../models/signmodel')
const bcrypt = require('bcryptjs')
const saltRounds = 8
const router = new express.Router()

router.post('/signup',(req,res)=>{
    console.log('cammmmmmmmmmmmmmmmeeeeeeeeeeeeeeeee')
    bcrypt.hash(req.body.password,saltRounds).then(async(hashedPassword)=>{

        const usr = new signcollections({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password:hashedPassword
        })
      
        try{
            const user = await usr.save()
            res.send(user)
        }
        catch(e){
            res.send({
                status:400,
                message:e
            })
        }
    })
})

module.exports = router