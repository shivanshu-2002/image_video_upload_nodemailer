const File = require("../model/File");
const cloudinary  =require('cloudinary');


exports.localFileUpload = async (req,res)=>{
     try{

        const file = req.files.file;
        console.log(file)
        let path = __dirname + '/files/'+Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path,(err)=>{
             console.log(err);
        })

        res.status(200).json({
             success:true,
             message:"Bhai kam ho gya LocalfileUpload"
        })
     }catch(error){
        console.log(error);
     }
}

const isSupportedFileType = (filetype, supportedTypes) => {
     return supportedTypes.includes(filetype);
   }
   
const uploadFileToCloudinary = async (file, folder,quality) => {
     const options = { folder };  
     options.resource_type="auto"; 
     options.quality = quality;
     try {
       const response = await cloudinary.v2.uploader.upload(file.tempFilePath, options);
       return response;
     } catch (error) {
       console.error('Error uploading to Cloudinary:', error);
       throw error; // Re-throw the error to handle it in the calling function
     }
   }
// ImageUpload Handler..

exports.imageUpload =  async (req,res)=>{
     try{
          // fetch data
      const {name,tags,email }  =req.body;
      const  file = req.files.image;
      console.log("file->",file);

     //  validate the data 

     const supportedType = ["jpg","jpeg","png"];
     const filetype = file.name.split('.')[1].toLowerCase();


     if(!isSupportedFileType(filetype,supportedType)){
          res.status(400).json({
               success:false,
               message:"Media type Not supported"
          })
     }

     // upload on Cloudinary...
      const response = await uploadFileToCloudinary(file,"uploadFilesbabbar");
      console.log(response)

      const filedata = await File.create({
           name,email,imageUrl:response.secure_url,tags
      });

      res.status(200).json({
           success:true,
           message:"File Uploaded Successsfully"
      })

     } catch(error){
         console.log(error)
         res.status(400).json({
            message:"Bhai SOrry upload nii kr paunga",
            success:false
         })
     }
}

// Video Upload Handlers..

exports.videoUpload = async (req, res) => {
     try {
       // Fetch data
       const { name, tags, email } = req.body;
       const file = req.files.videoFile;
       
       // Validate the data
      
       const supportedTypes = ["mp4", "mov"];
       const filetype = file.name.split('.')[1].toLowerCase();
  
       if (!isSupportedFileType(filetype, supportedTypes)) {
         return res.status(400).json({
           success: false,
           message: "Media type Not supported"
         });
       }
   
       // Upload to Cloudinary
       const response = await uploadFileToCloudinary(file, "uploadFilesbabbar");
       console.log(response);
   
       // Create record in your database (assuming File.create works as expected)
       const filedata = await File.create({
         name, email, imageUrl: response.secure_url, tags
       });
   
       return res.status(200).json({
         success: true,
         message: "File Uploaded Successfully"
       });
   
     } catch (error) {
       console.error(error);
       return res.status(400).json({
         message: "Sorry, unable to upload",
         success: false
       });
     }
   }
//    Size reduce and upload image to cloudinary..

exports.imageSizeReduce = async (req, res) => {
     try {
       // Fetch data
       const { name, tags, email } = req.body;
       const file = req.files.image;
       
       // Validate the data
      
       const supportedTypes =  ["jpg","jpeg","png"];
       const filetype = file.name.split('.')[1].toLowerCase();
  
       if (!isSupportedFileType(filetype, supportedTypes)) {
         return res.status(400).json({
           success: false,
           message: "Media type Not supported"
         });
       }
   
       // Upload to Cloudinary
       const response = await uploadFileToCloudinary(file, "uploadFilesbabbar",60); //the 60 is quality value this is used to compress the image 
       console.log(response);
   
       // Create record in your database (assuming File.create works as expected)
       const filedata = await File.create({
         name, email, imageUrl: response.secure_url, tags
       });
   
       return res.status(200).json({
         success: true,
         message: "File Uploaded Successfully"
       });
   
     } catch (error) {
       console.error(error);
       return res.status(400).json({
         message: "Sorry, unable to upload",
         success: false
       });
     }
   }
