const express = require("express");
const  app = express();


require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const fileupload = require("express-fileupload");
app.use(fileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
       }
));

const db = require('./config/db');
db.connect();

const Cloudinary = require("./config/cloudinary");
Cloudinary.cloudinaryConnect();

const route = require('./routes/FileUpload');
app.use('/api/v1/upload',route);

app.listen(PORT,()=>{
      console.log(`Hey Server is runnin on port num : ${PORT}`)
})