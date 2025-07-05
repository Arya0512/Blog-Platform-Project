const express = require("express"); // You missed importing express
const mongoose = require('mongoose');
const Blog = require("../models/blog");
const User=require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const autherMiddleware=require("../Middlewares/autherizationMiddelware");

// CREATE Blog - POST /api/blogs
router.post("/",autherMiddleware, async (req, res) => {
  try {
    console.log("Create blog request body:", req.body);
    const blog = new Blog(req.body);
    await blog.save();
    res.send(blog);
    
  } catch (err) {
    res.status(400).send({ error: err.message }); // better error format
  }
});

// READ Blogs - GET /api/blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//get sepecific blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    res.send(blog);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE Blog - PUT /api/blogs/:id
router.put("/:id",autherMiddleware, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true } 
    )
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE Blog - DELETE /api/blogs/:id
router.delete("/:id",autherMiddleware, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send({ message: "Successfully deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Signup Route
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

