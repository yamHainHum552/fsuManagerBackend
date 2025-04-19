const Transaction = require("../models/Transaction");
const { deleteImage, getPublicIdFromUrl } = require("../services");

exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, category, date, note } = req.body;
    const billUrl = req.file ? req.file.path : "";

    // Check for duplicate
    const existingTransaction = await Transaction.findOne({
      type,
      amount,
      category,
      date,
      note,
    });

    // ❌ If duplicate, delete uploaded image
    if (existingTransaction && req.file) {
      const publicId = req.file.filename.split(".")[0]; // extract from filename
      await cloudinary.uploader.destroy(publicId);
      return res.status(400).json({ message: "Transaction already exists" });
    }

    const transaction = new Transaction({
      type,
      amount,
      category,
      date,
      note,
      billUrl,
    });

    await transaction.save();
    res
      .status(201)
      .json({ transaction, message: "Transaction added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔄 Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    // 🗑️ Delete old file if new file is uploaded
    if (req.file && transaction.billUrl) {
      const publicId = getPublicIdFromUrl(transaction.billUrl);

      await deleteImage(publicId);
    }

    // Update fields
    transaction.type = req.body.type || transaction.type;
    transaction.amount = req.body.amount || transaction.amount;
    transaction.category = req.body.category || transaction.category;
    transaction.date = req.body.date || transaction.date;
    transaction.note = req.body.note || transaction.note;
    if (req.file) {
      transaction.billUrl = req.file.path;
    }

    await transaction.save();
    res.json({ transaction, message: "Transaction updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // 🧹 Delete image from Cloudinary if exists
    if (transaction.billUrl) {
      const publicId = getPublicIdFromUrl(transaction.billUrl);

      await deleteImage(publicId);
    }

    await Transaction.deleteOne({ _id: transaction._id });

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
