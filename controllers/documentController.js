const Document = require("../models/Document");
const { getPublicIdFromUrl, deleteImage } = require("../services");

const path = require("path");

exports.uploadDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = req.file.path;
    const ext = path.extname(req.file.originalname).replace(".", "");
    const documentType = ext.toLowerCase();

    const newDoc = new Document({
      title,
      description,
      fileUrl,
      documentType,
    });

    await newDoc.save();

    res.status(201).json({
      message: "Document uploaded successfully",
      document: newDoc,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // Delete file from Cloudinary
    if (doc.fileUrl) {
      const publicId = getPublicIdFromUrl(doc.fileUrl);
      await deleteImage(publicId);
    }

    // Delete document from MongoDB
    await Document.findByIdAndDelete(req.params.id);

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error.message);
    res.status(500).json({ message: "Failed to delete document" });
  }
};

// Get all documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ uploadedAt: -1 });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error.message);
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    // If a new file is uploaded, delete the old one
    if (req.file) {
      if (doc.fileUrl) {
        const publicId = getPublicIdFromUrl(doc.fileUrl);
        await deleteImage(publicId);
      }

      const fileUrl = req.file.path;
      const ext = path.extname(req.file.originalname).replace(".", "");
      doc.fileUrl = fileUrl;
      doc.documentType = ext.toLowerCase();
    }

    doc.title = title || doc.title;
    doc.description = description || doc.description;

    await doc.save();

    res.json({ message: "Document updated successfully", document: doc });
  } catch (error) {
    console.error("Error updating document:", error.message);
    res.status(500).json({ message: "Failed to update document" });
  }
};
