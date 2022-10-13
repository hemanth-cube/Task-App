const express = require('express')
const signcollections = require('../models/signmodel')
const bcrypt = require('bcryptjs')
const saltRounds = 8
const router = new express.Router()
const sendMail = require('../sendmail')
// const b = require('../sendmail').setMail
// add(1,2)
router.post('/signup',(req,res)=>{
    // C:\Users\chiruvellahemanth\Downloads\taskapp - Copy\src\sendmail.js

    bcrypt.hash(req.body.password,saltRounds).then(async(hashedPassword)=>{

        const usr = new signcollections({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password:hashedPassword,
            description:req.body.description
        })
      
        try{
            const user = await usr.save()
            console.log(user.username)
            sendMail.setMail(user.username,user.description) // Here we use (sendmail.getMail) because in module.exports of sendmail path ..used flower brace which represents object
            // b(3,2)
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