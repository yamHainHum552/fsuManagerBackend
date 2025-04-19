const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  date: { type: Date, default: Date.now },
  note: { type: String },
  billUrl: { type: String, default: "" },
});

module.exports = mongoose.model("Transaction", transactionSchema);
