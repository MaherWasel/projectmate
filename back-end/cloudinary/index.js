if (process.env.NODE_ENV !== "production") {
    const dotenv = require("dotenv");
    dotenv.config({ path: "./config.env" });
}

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ProjectMate',
        allowedFormats: ['jpg', 'png', 'jpeg', 'svg'],
    }
});

module.exports = {
    cloudinary,
    storage
}