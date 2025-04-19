const express = require("express");
const router = express.Router();
const {
  uploadDocument,
  getDocuments,
  deleteDocument,
} = require("../controllers/documentController");

const upload = require("../middlewares/uploadToCloudinary"); // 💡 Using Cloudinary middleware

// 🌩 Upload document to Cloudinary
router.post("/add", upload.single("file"), uploadDocument);

// 📂 Get all documents
router.get("/", getDocuments);

// 🗑️ Delete a document (optional)
router.delete("/:id", deleteDocument);

module.exports = router;
