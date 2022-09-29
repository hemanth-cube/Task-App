
const express = require('express')
require('./db/mongoose')         //mongoose connects database
const users = require('./models/user')
const task = require('./models/task')
const studentcollection = require('./models/student')
// const sRoute = require('./routes/studentroute')
// const uRoute = require('./routes/userroute')
// const tRoute = require('./routes/studentroute')
// const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 2000
app.use(express.json())
// app.use(sRoute)
// app.use(uRoute)
// app.use(tRoute)
// urlencodedbodyparser = bodyParser.urlencoded({extended: false});



// app.post('/users',(req,res)=>{     
    
//     const user = new users(req.body);
//     // Here what type crud operations are using is written
//     // const Student_variable = new studentcollection(req.body) // pushing json data to the particular collection
   
//     // res.send('Inside of student post')
// })

app.post('/users',async(req,res)=>{
    const user = new users(req.body)
    try{
        await user.save()
    }
    catch(err){
            res.send({
                status:400,
                message:"query failed",
            })
    }
})
app.get('/users',(req,res)=>{
    users.find({}).then((result)=>{
        res.send(result)
    }).catch((error)=>{
        res.send('failed')
    })
    // res.send("Inside of getting users")
})

app.post('users/login',async(req,res)=>{
    await users.findByCredentials(req.body.username,req.body.password)
})



app.get('/task',async (req,res)=>{
    try{
        res.send(await task.find({}))

    }
    catch(err){
        res.status(400).send("error")
    }
})
//     }).then((gettingtasks)=>{
//         console.log('***************', gettingtasks)
        
//         res.json(gettingtasks)
//     }).catch((error)=>{
//         console.log('failed')
//     })
//     res.send(data)
// })

app.post('/task',async(req,res)=>{
    const t = new task(req.body)
    try{
        await t.save() 
        res.send(t)    
    }
    catch(err){
            console.log(err)
    }
   
})

app.patch('/task/:id',async(req,res)=>{
    const updates = Object.keys(req.body)    // gets all the keys in task collection
    const allowedUpdates = ["description","completed"] 
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation)
    {
        res.status(400).send('Unknown updates')
    }
    try{

        const t = await task.findOneAndUpdate(req.params.id,req.body,{new:true,runValidators:true})   // runvalidators passes to catch whenerver req.params.id is invalid
        if(!t)
        {
            return res.status(400).send('') // If no data given from postman,it direcyly goes to catch
        } 
            res.send(t)
    
    }
    catch(err){
        res.status(404).send("no id")
    }

})

app.get('/student/:id',(req,res)=>{
    const _id = req.params.id

    studentcollection.findById(_id).then((student)=>{
        if(!student)        // if no users matched with that id
        {
            res.status(400).send()
        }
        res.send(student)
    }).catch((err)=>{           // catch will be executed whenever the query is unsuccessful
        res.status(400).send(err)
    })
})
app.post('/student',(req,res)=>{        // Here what type crud operations are using is written
    const Student_variable = new studentcollection(req.body) // pushing json data to the particular collection
    Student_variable.save().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    })

})

app.get('/student',(req,res)=>{
    studentcollection.find({}).then((result)=>{
        res.send(result)
        // console.log(result)
    }).catch((err)=>{
        console.log(err)
    })
})

app.patch('/student/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates=["name","email","branch"]
    const isValidOperation = updates.every((update)=>{
            return allowedUpdates.includes(update)
        
    })
   if(!isValidOperation){
    res.status(400).send('Invalid Update')
   }
   
    try{
        const student = await studentcollection.findById(req.params.id)
        updates.forEach((update)=>{     // allowedupdates
            student[update] = req.body[update]
        })
        await student.save()
        //const student = await studentcollection.findOneAndUpdate(req.params.id,req.body,{new:true,runValidators:true})  // requesting the user which field do you want to update(2nd parameter)
        if(!student){
           return res.status(404).send("No student found")
        }
     res.send(student)
    }
   catch(e){        // If id is incorrect
        res.status(400).send("Enter correct id")
   }
})

app.delete('/student/:id',async(req,res)=>{
    
    try{
       const user = await studentcollection.findByIdAndDelete(req.params.id)
       if(!user)
       {
        res.status(400).send()
       }
       
       console.log(await studentcollection.countDocuments())
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})
app.listen(port,()=>{
    console.log("port is running on " + port)
})

