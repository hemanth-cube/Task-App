const add = (a,b,callback)=>{
    setTimeout(()=>{
        callback(undefined,a+b)
    },2000)
}

add(1,2,(error,data)=>{
    console.log("Outside data",data)
    add(data,3,(error,data)=>{
        console.log("Nested data",data)
    })
})