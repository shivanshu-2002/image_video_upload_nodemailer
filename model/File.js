const mongoose = require('mongoose');
const nodemailer =  require('nodemailer');

const FileSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     imageUrl:{
        type:String,
        
     },
     tags:{
        type:String
     }
})

// Here Post MiddleWare ..
FileSchema.post("save",async function(doc){
   try{

      // Configuration of transporter...Shift it in config folder
      console.log(doc) // database me jo entry hui hai..
   let transporter = nodemailer.createTransport({
       host:process.env.MAIL_HOST,
       auth:{
           user:process.env.MAIL_USER,
           pass:process.env.MAIL_PASS,
       }
   })
   // Send mail
     let info  = await transporter.sendMail({
      from:`Shivanshu@from`,
      to:doc.email,
      subject:"New File uploaded on Cloudinary",
      html:`<h2>Hey there New File Uploaded</h2>`
     })
     console.log(info);
   }
   catch(error){
       console.log(error)
   }
})

module.exports = mongoose.model("File",FileSchema);