const add = (a,b)=>{

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}


const doSum = async()=>{
    const sum1 = await add(1,2)
    const sum2 = await add(100,sum1)
    const sum3 = await add(1,sum2)
    return sum3
}

doSum().then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})