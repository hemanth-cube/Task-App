const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')
const cors = require('cors')
const signupcollection = require('./models/signupmodel')
const bcrypt = require('bcryptjs')
const saltRounds = 8
const app = express()
app.use(cors())
urlencodedbodyparser = bodyParser.urlencoded({extended: false});
//app.use(express.urlencoded({extended:true}))
app.use(express.json()) // For Taking json data from postman or frontend
const port = process.env.PORT || 2000
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');

    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

    if ("OPTIONS" === req.method) {

        res.sendStatus(200);

    } else {

        console.log(`${req.ip} ${req.method} ${req.url}`);

        next();

    }

});
app.post('/signup',urlencodedbodyparser,(req,res)=>{
        console.log("********",req)
       bcrypt.hash(req.body.password,saltRounds).then((hashedPassword)=>{
            const usr = new signupcollection({
                firstname:req.body.Firstname,
                lastname:req.body.Lastname,
                username:req.body.username,
                password:hashedPassword
            })
            usr.save().then(()=>{
                res.send({
                    status:200,
                    message:"success",
                    data:usr
                })
            }).catch((err)=>{
                res.send({
                    status:400,
                    message:err
                })
            })
       })
       
})
       
        

app.get('/login',(req,res)=>{
const checkUsername = req.body.email
const checkPassword = req.body.password
 signupcollection.findOne({username:{$eq:checkUsername}}).then((found)=>{
        if(!found){
            return res.status(400).send("Email not found!")
        }
        bcrypt.compare(checkPassword,found.password).then((isMatched)=>{
            if(isMatched==true){
                return res.send({
                    status:200,
                    message:"success"
                })
            }
            else
            {
                return res.status(400).send('Wrong password!')
            }
        })
    }).catch((err)=>{
        res.send({
            status:400,
            message:err
        })
    })
})

app.listen(port,()=>{
    console.log("port is running on ",port)
})

