require('../src/db/mongoose')
const task = require('../src/models/user')

// task.findByIdAndDelete('63314e6f2438f514a0fcc9fa',).then((data)=>{
//     console.log(data)

//     return task.countDocuments({"completed":false})
// }).then((data)=>{
//     console.log(data)
// }).catch((err)=>{
//     console.log(err)
// })


const doFind = async(_id)=>{
    const updateuserage = await task.findByIdAndUpdate(_id,{age:1})
    const count = await task.countDocuments({age:{$gte:30}})
    return count
}

doFind('63314e6f2438f514a0fcc9fa').then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.log(err)
})

const deleteTaskandCount = async(id)=>{
    await task.findByIdAndDelete(id)
    const count = await task.countDocuments({})
    return count
}
deleteTaskandCount('63314e6f2438f514a0fcc9fa').then((count)=>{
    console.log(count)
}).catch((err)=>{
    console.log(err)
})