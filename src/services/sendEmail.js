import nodemailer from 'nodemailer'

export const sendEmail= async(to,subject,html) =>{

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.email,
        pass:process.env.Gpassword
    },
})


let info =await transporter.sendMail({
    from: `FROM ahmad qutob <${process.env.email}>`,
    to ,
    subject,
    html,
    // attachments:attachment if u want to send file (pdf file)
})




}









// import nodemailer from 'nodemailer'

// export const sendEmail= async() =>{

// let transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:process.env.email,
//         pass:process.env.Gpassword
//     },
// })


// let info =await transporter.sendMail({
//     from: `FROM ahmad qutob <${process.env.email}>`,
//     to :"ahmadqutob226@hmail.com",
//     subject:'subject confairm email',
//     html:"<h1> confairm your email </h1>"
// })




// }