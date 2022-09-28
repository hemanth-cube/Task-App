const bcrypt = require('bcryptjs')

const pass = async()=>{

    const password = 'Red1234!'
    const hashedPassword = await bcrypt.hash(password,8)   // Password,No. of rounds to perform
    console.log(password)
    console.log(hashedPassword)
    const bool = await bcrypt.compare('Red1234!',hashedPassword)
    console.log(bool)
}

pass()