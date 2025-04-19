const cloudinary = require("../config/cloudinary"); // import this
const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const filenameWithExtension = parts.pop();
  const folder = parts.pop(); // fsu-transactions
  const publicId = `${folder}/${filenameWithExtension.split(".")[0]}`;
  return publicId;
};

const deleteImage = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.api.delete_resources([publicId], (err, result) => {
      if (err) {
        console.error("Error deleting image from Cloudinary:", err.message);
        reject(err.message);
      } else {
        console.log("Image deleted successfully:", result);
        resolve(result);
      }
    });
  });
};

module.exports = { deleteImage, getPublicIdFromUrl };
