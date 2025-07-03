// BlogDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import BlogCard from "../components/BlogCard";
import { FaUser, FaSignOutAlt, FaPlus, FaSearch } from "react-icons/fa"; // ✅ Search icon
import "../styles/dash.css";

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Sort by newest first
  const filteredBlogs = blogs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* ✅ Search Input with Icon */}
        <div className="position-relative w-50">
          <FaSearch className="search-icon" />
          <input
            className="form-control ps-5"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="d-flex gap-3">
          <button className="btn btn-outline-primary" onClick={() => navigate("/profile")}>
            <FaUser /> Profile
          </button>
          <button className="btn btn-outline-secondary" onClick={handleLogout}>
            <FaSignOutAlt /> Sign Out
          </button>
          <button className="btn custom-btn-primary" onClick={() => navigate("/create")}>
            <FaPlus /> Create New Blog
          </button>
        </div>
      </div>

      <h2 className="fw-bold mb-4">Educational Blog</h2>

      {filteredBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="row g-4">
          {filteredBlogs.map((blog) => (
            <div className="col-md-4" key={blog._id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;
