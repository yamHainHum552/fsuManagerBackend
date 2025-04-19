// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const transactionRoutes = require("./routes/transactionRoutes");
const documentRoutes = require("./routes/documentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/transactions", transactionRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api", authRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
