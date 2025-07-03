// ✅ FULLY WORKING EditBlog.js
// Includes: Fetching blog, Update with/without image, Delete button

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../services/api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setForm(res.data.blog);
      } catch (err) {
        alert("Failed to fetch blog");
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("content", form.content);
      if (file) {
        formData.append("image", file);
      } else {
        formData.append("image", form.image);
      }

      await axios.put(`/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog updated successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/blogs/${id}`);
      alert("Blog deleted successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between mb-4">
        <h2>Edit Blog Post</h2>
        <button className="btn btn-danger" onClick={handleDelete}>
          🗑️ Delete Blog
        </button>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          className="form-control mb-3"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {form.image && !file && (
          <img
            src={`http://localhost:5000${form.image}`}
            alt="Current"
            className="mb-3"
            style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
          />
        )}
        <textarea
          className="form-control mb-3"
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          rows={6}
          required
        />
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
