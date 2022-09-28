
const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{        // Users model must and should macth with Tdatabase contenrs

    useUnifiedTopology:true,
    useCreateIndex:true
})

