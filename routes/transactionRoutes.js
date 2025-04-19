const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

const upload = require("../middlewares/uploadToCloudinary"); // ✅ Cloudinary upload

// ✅ Use Cloudinary's `upload.single("bill")` for both add and update
router.post("/add", upload.single("bill"), addTransaction);
router.get("/", getTransactions);
router.put("/:id", upload.single("bill"), updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
