const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      // Income Categories
      "salary",
      "freelance",
      "business",
      "charges",
      "investment",
      "gift",
      "bonus",
      "other_income",

      // Expense Categories
      "food",
      "transport",
      "entertainment",
      "utilities",
      "shopping",
      "health",
      "education",
      "bills",
      "rent",
      "travel",
      "subscriptions",
      "donation",
      "other_expense",
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
  },
  billUrl: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
