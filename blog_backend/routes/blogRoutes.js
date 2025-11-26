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



module.exports = router;

