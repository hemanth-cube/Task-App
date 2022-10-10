
const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect(process.env.MONGODB_URL,{        // Users model must and should macth with Tdatabase contenrs

    useUnifiedTopology:true,
    useCreateIndex:true
})

