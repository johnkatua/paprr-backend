import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import * as Cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: Cloudinary.v2,
  params: {
    folder: "Papers",
    allowedFormats: ["pdf", "docx"],
    pages: true,
    transformation: {
      width: 400,
      height: 600,
      crop: "limit",
    },
  },
});

const upload = multer({ storage: storage }).single("file");

export default upload;
