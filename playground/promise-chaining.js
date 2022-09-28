require('../src/db/mongoose')
const users = require('../src/models/user')

users.findByIdAndUpdate('63314d7f6eccd92a505e8d54',{age:1}).then((data)=>{

    console.log(data)

    return users.countDocuments({age:1})
    

}).then((data)=>{
    console.log('documents count with age 1',data)
}).catch((error)=>{
    console.log(error)
})

    
