const express = require('express')
const studentcollection = require('../models/student')
const router = new express.Router()

router.post('/student',async(req,res)=>{        // Here what type crud operations are using is written
    const Student_variable = new studentcollection(req.body) // pushing json data to the particular collection
    try{
        await Student_variable.save()
    }
    catch(e){
        res.status(400).send(e)
    }

})
router.get('/student/:id',async(req,res)=>{
    const _id = req.params.id

            // if no users matched with that id
        try{
            const student = await studentcollection.findById(_id)
            res.send(student)
        }
        catch(err){           // catch will be executed whenever the query is unsuccessful
        res.status(400).send(err)
        }
})
router.get('/student',(req,res)=>{
    studentcollection.find({}).then((result)=>{
        res.send(result)
        // console.log(result)
    }).catch((err)=>{
        console.log(err)
    })
})
router.patch('/student/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates=["name","email","branch"]
    const isValidOperation = updates.every((update)=>{
            return allowedUpdates.includes(update)
        
    })
   if(!isValidOperation){
    res.status(400).send('Invalid Update')
   }
   
    try{
    const student = await studentcollection.findOneAndUpdate(req.params.id,req.body,{new:true,runValidators:true})  // requesting the user which field do you want to update(2nd parameter)
        if(!student){
           return res.status(404).send("No student found")
        }
     res.send(student)
    }
   catch(e){        // If id is incorrect
        res.status(400).send("Enter correct id")
   }
})
module.exports = router

