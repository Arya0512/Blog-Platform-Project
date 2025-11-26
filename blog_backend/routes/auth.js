const express = require("express"); // You missed importing express
const mongoose = require('mongoose');
const Blog = require("../models/blog");
const User=require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hash });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id },process.env.SECRET_KEY , { expiresIn: "1h" });

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error("Signup failed", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (err) {
    console.error("Login failed", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

