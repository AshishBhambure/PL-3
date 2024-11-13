
const cloudinary = require('cloudinary').v2;
// floder name  :: StudyNotion
const connectToCloudinary = () =>{
 try{
    //  require('dotenv').config();
    cloudinary.config({
        cloud_name:"dsbjv3jws",
        api_key:479447944651132,
        api_secret:"CHS8RWVPvcaOz72z2OsQCORCM0E",
        secure:true,

    })
 }
 
 catch(e)
 {
    console.log("Error Ehile Estabilishing Connection With Cloudinary  , ",e)
 }
}

module.exports  = connectToCloudinary;

