import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

const uploadFile = async (file: Express.Multer.File) => {
    try {
      const upload = await cloudinary.uploader.upload(file.path);
      return upload.secure_url;
    } catch(error: any){
      throw new Error(error.message)
    }
};

export default uploadFile;