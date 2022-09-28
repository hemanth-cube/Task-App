// // const Promise = require('promise')
// const doWorkpromise = new Promise((resolve,reject)=>{

//         setTimeout(()=>{
//              resolve([7,4,1])
//             reject("It is rejected!")
//         },2000)
// })

// doWorkpromise.then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log("Things went wrong")
// })

// const add = (a,b)=>{
//     return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(a+b)
//     },2000)
// })}



// add(1,2).then((result)=>{
//     console.log(result)
//     add(result,3).then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })
// }).catch((error)=>{
//     console.log(error)
// })
const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}

add(1,2).then((data)=>{
console.log(data)
    return add(data,3)
}).then((Data)=>{
    console.log(Data)
}).catch((err)=>{
    console.log(err)
})