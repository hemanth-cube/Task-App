var nodemailer = require("nodemailer");
// const sendmail = require('./routes/signuproute')

// create reusable transport method (opens pool of SMTP connections)

var smtpTransport = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secureConnection: false,
    auth: {
        user: "chiruvella.hemanth@cubehighways.com",
        pass: "Micro@9876"
    }
});
const getMail = (toEmail,description)=>{
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log(toEmail)
    var mailOptions = {
        from: "chiruvella.hemanth@cubehighways.com", 
        to:toEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: description, // plaintext body
        html: "<b>Hello world ✔</b>" // html body
    }
    smtpTransport.sendMail(mailOptions)
}
module.exports = {
    setMail:getMail                
}
// module.exports=getMail
// send mail with defined transport object
//, function(error, response){
//     if(error){
//         res.send(500)
//     }else{
//         res.send(200)
//     }
// })
