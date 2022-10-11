const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json()) // For Taking json data from postman or frontend
require('./db/mongoose')
// const task2collection = require('./models/task2model')
const signuproute = require('./routes/signuproute')
const loginroute = require('./routes/loginroute')
const taskr = require('./routes/taskr')
const auth = require('./middleware/auth')
const signcollections = require('./models/signmodel')
const { sign } = require('jsonwebtoken')
const { populate } = require('./models/task2model')
const port = process.env.PORT       // PORT came from config/dev.env
console.log(port)
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
  })
  app.use(signuproute)
  app.use(loginroute)
  app.use(taskr)



app.post('/logout',auth,async(req,res)=>{
    usertoken = req.header('Authorization').replace('Bearer ','')
    console.log('tokens',req.user.tokens)
    try{
        req.user.tokens = req.user.tokens.filter((eachtoken)=> {
            return eachtoken.token !== usertoken   //  Doesnt store false values  // req.token which we passed as bearer token
         })
        await req.user.save() 
    res.send()
    
    } 
    catch(e){
        console.log(e)
        res.send({
            status:400,
            message:e
        })
    }
  
})

app.post('/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens = []        // All tokens will be erased
        await req.user.save()
        res.send()
    }
    catch(e){
        res.send({
            status:500,
            message:e
        })
    }
  
})

app.get('/user/:id',async(req,res)=>{
    console.log(req.params.id)
    try{
        const curuser = await signcollections.findById(req.params.id)
        console.log(curuser)
            res.send(curuser)
    }
    catch(err){
        res.send('Error')
    }
})

app.delete('/deleteuser',auth,async(req,res)=>{

    try{
        console.log("Deleting File",req.user)
        await req.user.remove()
        console.log('After removal')
        res.send(req.user)
    }
    catch(e){
        res.send({
            status:400,
            message:'error'
        })
    }
})

app.patch('/updateuser',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['firstname','lastname','username']
    const bool = updates.every((update)=>{      // every returns true/false
        return allowedUpdates.includes(update)
    })
    console.log(bool)
    if(!bool){
         return res.send({error:"Enter Correct field to update"})
    }
    updates.forEach((update)=>{
        req.user[update] = req.body[update]
    })
    await req.user.save()
    res.send(req.user)


})
app.get('/titleview/:id',async(req,res)=>{
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



app.listen(port,()=>{
    console.log("port is running on ",port)
})

