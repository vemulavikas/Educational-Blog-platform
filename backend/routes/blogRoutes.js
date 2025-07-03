const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Blog = require("../models/Blog");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

/**
 * CREATE Blog
 */
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const blog = new Blog({
      title,
      content,
      category,
      image: imagePath,
      author: req.user.id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Blog creation failed:", err);
    res.status(500).json({ message: "Blog creation failed" });
  }
});

/**
 * GET All Blogs (with author populated)
 */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

/**
 * GET Blog by ID
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email");
    const userId = req.user.id;
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ blog, userId });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
});

/**
 * UPDATE Blog - Only author can update
 */
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }

    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.category = req.body.category;

    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      blog.image = req.body.image;
    }

    await blog.save();
    res.json({ message: "Blog updated successfully", blog });
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ message: "Failed to update blog" });
  }
});

/**
 * DELETE Blog - Only author can delete, and delete image file from disk
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    // Delete image from disk if exists
    if (blog.image) {
      const imagePath = path.join(__dirname, "..", blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await blog.deleteOne();
    res.json({ message: "Blog and image deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

/**
 * POST Comment
 */
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const user = await User.findById(req.user.id);
    const comment = { name: user.name, text: req.body.text };
    blog.comments.push(comment);
    await blog.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to post comment" });
  }
});

module.exports = router;
