import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Keep using your custom CSS

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      className="blog-card rounded-4 shadow-sm bg-white h-100"
      onClick={() => navigate(`/blogs/${blog._id}`)}
    >
      {/* Image */}
      <div className="blog-card-img-container">
        <img
          src={`http://localhost:5000${blog.image}`}
          alt={blog.title}
          className="w-100 h-100 blog-card-img"
        />
      </div>

      {/* Category badge */}
      <span className="blog-card-category badge">
        {blog.category}
      </span>

      {/* Title */}
      <h5 className="fw-bold mt-2 mb-1">{blog.title}</h5>

      {/* Content preview */}
      <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
        {blog.content.slice(0, 100)}...
      </p>

      {/* Author */}
      <p className="text-muted small mb-0">
        By: {blog.author?.name || "Anonymous"}
      </p>
    </div>
  );
};

export default BlogCard;
