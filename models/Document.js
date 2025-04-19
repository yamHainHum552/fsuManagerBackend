const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  documentType: {
    type: String,
    enum: ["pdf", "doc", "docx", "png", "jpg", "jpeg", "xlsx", "xls"],
    required: true,
  },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
