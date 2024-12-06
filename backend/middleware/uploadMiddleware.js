const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinaryConfig");

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads", // Folder in your Cloudinary account
        allowed_formats: ["jpeg", "png", "jpg"], // Allowed file formats
    },
});

// Export multer instance
const upload = multer({ storage: storage });

module.exports = upload;
