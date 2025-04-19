const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

const upload = require("../middlewares/uploadToCloudinary"); // ✅ Cloudinary upload
const { protect } = require("../middlewares/authMiddleware");

// ✅ Use Cloudinary's `upload.single("bill")` for both add and update
router.post("/add", protect, upload.single("bill"), addTransaction);
router.get("/", protect, getTransactions);
router.put("/:id", protect, upload.single("bill"), updateTransaction);
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
