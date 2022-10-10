const jwt = require('jsonwebtoken')
const signcollections = require('../models/signmodel')
const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const username = await jwt.verify(token,process.env.JWT_SECRET)
        // console.log(username)
        const user = await signcollections.find({"username":username,'tokens.token':token})
        if(!user[0]){
            throw new Error('No user found')
        }
        req.user = user[0]
        // console.log(user[0])
        // console.log('tokens',req.user.tokens)
        next()
    }
    catch(err){
        res.send({error:'please Authenticate.....  '})
    }
}
module.exports = auth