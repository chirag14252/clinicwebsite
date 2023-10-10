import NewLetterModel from "../Models/NewLetter.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
const newLetter = (req,res)=>{
    const email = req.body.email;
    if(!email){
       return res.status(400).json({
           message:"empty email"
       })
    }
    //valid mail or not
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
       const  isValidMail = ()=>{
           return emailRegex.test(email);
       }
   if(!isValidMail){
           return res.status(400).json({
               message:"pls enter a valid mail"
           })
    }
// for sending the email automatically
const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"chi.chiragbhardwaj@gmail.com",
        pass:"xbhussqqlbkfnlxa"
    }
})
var mailGenerator = new Mailgen({
    theme: 'salted',
    product: {
        // Appears in header & footer of e-mails
        name: 'Gangapur interiors',
        link: 'https://mailgen.js/',
        // Optional product logo
        logo: 'https://mailgen.js/img/logo.png'
    }
});
var emailGen = {
    body: {
        title: 'Thank you for connecting with Gangapur interior!',
        outro: "we will keep you up with further updates"
    }
};
const emailbody = mailGenerator.generate(emailGen);
let message = {
    from:"chi.chiragbhardwaj@gmail.com",
    to: email,
    subject : "Gangapur interiors",
    html: emailbody
}
transport.sendMail(message);


//creating models for database
    NewLetterModel.create({
       email:email
    }).then((data,err)=>{
      if(data){
       return res.status(201).json(
           {
               message:"email sent successfully"
           }
       )
      }
      if(err){
       return res.status(500).json(
           {
           message: "server side error"
           }
       )
      }
    })
   }

   export default newLetter;