const express = require('express')
const request = require('request')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
require('./db/mongoose')
const cors = require('cors')
const signcollections = require('./models/signmodel')
const task2collection = require('./models/task2model')
const bcrypt = require('bcryptjs')
const saltRounds = 8
const app = express()
app.use(cors())
urlencodedbodyparser = bodyParser.urlencoded({extended: false});
//app.use(express.urlencoded({extended:true}))
app.use(express.json()) // For Taking json data from postman or frontend
const port = process.env.PORT || 2000
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
  })
app.post('/signup',(req,res)=>{
  bcrypt.hash(req.body.password,saltRounds).then((hashedPassword)=>
  {
                    const usr = new signcollections({
                                    firstname:req.body.firstname,
                                    lastname:req.body.lastname,
                                    username:req.body.username,
                                    password:hashedPassword
                    })
                    
                    usr.save((error,data)=>{
                    if(error){
                        return res.send(error)
                    }   
                    // const token = jwt.sign({_id:usr._id.toString()},"wearecube",{expiresIn:"1 year"})
                    // usr.tokens = usr.tokens.concat({token})
                    // usr.save()
                    res.send(data)
                    })
    }).catch((err)=>{
        res.status(400).send(err)
    })

    
       
})
       
        

app.post('/login',(req,res)=>{
const checkUsername = req.body.username
const checkPassword = req.body.password

 signcollections.findOne({username:{$eq:checkUsername}}).then((found)=>{
        if(!found){
            return res.status(400).send("username not found!")
        }
        bcrypt.compare(checkPassword,found.password).then((isMatched)=>{
            if(isMatched==true){
                // const token = jwt.sign({_id:found._id.toString()},'wearecube')
                // return res.send({found, token})
                return res.send("sucsess")
            }
            return res.status(400).send('Wrong password!')
        })
    }).catch((err)=>{
        res.send({
            status:400,
            message:err
        })
    })
})
app.post('/createpost',async(req,res)=>{
    const data = new task2collection({
        title:req.body.title,
        description:req.body.description
    })
    try{
        const send = await data.save()
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
app.get('/listall',async(req,res)=>{
    try{
        const alldata = await task2collection.find({})    
        res.status(200).send(alldata)
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.get('/gettitle',async(req,res)=>{

    const Title = req.body.title
    try{
        const data = await task2collection.findOne({title:{$eq:Title}})
        if(!data){
            return res.status(400).send('title not found!')
        }
        res.send(data)
    }
   catch(err){
        res.send({
            status:404,
            message:err
        })
   }

})

app.get('/titleview/:id',async(req,res)=>{
    const _id = req.params.id
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
// app.post('/login',async(req,res)=>{
//     try{
//         const user = await signcollections.findByCredentials(req.body.username,req.body.password)
//         res.send(user)
//     }
//     catch(err){
//         res.status(400).send(err)
//     }
   
// })


app.listen(port,()=>{
    console.log("port is running on ",port)
})

