const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const blogRoutes = require("./routes/blogRoutes"); 

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/blogs", blogRoutes); 
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

