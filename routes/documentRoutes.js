const express = require("express");
const router = express.Router();
const {
  uploadDocument,
  getDocuments,
  deleteDocument,
} = require("../controllers/documentController");

const upload = require("../middlewares/uploadToCloudinary"); // 💡 Using Cloudinary middleware
const { protect } = require("../middlewares/authMiddleware");

// 🌩 Upload document to Cloudinary
router.post("/add", protect, upload.single("file"), uploadDocument);

// 📂 Get all documents
router.get("/", protect, getDocuments);

// 🗑️ Delete a document (optional)
router.delete("/:id", protect, deleteDocument);

module.exports = router;
