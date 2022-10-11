const express = require('express')
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const signcollections = require('../models/signmodel')
const router = new express.Router()
const auth = require('../middleware/auth')
router.post('/login',(req,res)=>{
   
    const checkUsername = req.body.username
    const checkPassword = req.body.password
    console.log(checkPassword)
    signcollections.findOne({username:{$eq:checkUsername}}).then((found)=>{
                if(!found){
                    return res.status(400).send("username not found!")
                }
                bcrypt.compare(checkPassword,found.password).then((isMatched)=>{
                    if(isMatched==true){
                        const token = jwt.sign(found.username,process.env.JWT_SECRET)
                        console.log('token-->',token)
                        found.tokens = found.tokens.concat({token})     // For concat we need to place required:true
                        found.save()
                        // res.send({found:found.getProfile(), token})
                        res.status(201).send({accessToken: token})  //==> Before sending data,it checks any toJSON present in the schema or not
                    }
                    else
                        res.status(400).send('Wrong password!')
                })
     }).catch((err)=>{
            res.send({
               status:400,
               message:err
        })
    })
})

router.get('/displayuserDetails',auth,async(req,res)=>{
    console.log('loginme')
    try{
        await res.status(200).send({user:req.user.getProfile()})
    }
    catch(e){
        res.send({
            status:404,
            message:"Tokens not present anymore"
        })
    }
    
})


module.exports = router