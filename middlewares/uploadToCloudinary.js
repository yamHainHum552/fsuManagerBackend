const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fsu-transactions",
    allowed_formats: ["jpg", "png", "pdf"],
  },
});

const upload = multer({ storage });
module.exports = upload;
