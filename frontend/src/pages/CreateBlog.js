import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import "../styles/home.css";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("content", form.content);
    data.append("category", form.category);
    if (imageFile) data.append("image", imageFile);

    try {
      await axios.post("/blogs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard");
    } catch (err) {
      alert("Blog creation failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">✍️ Create New Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input className="form-control mb-3" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input className="form-control mb-3" name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <input className="form-control mb-3" type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        <textarea className="form-control mb-3" name="content" value={form.content} onChange={handleChange} rows="6" placeholder="Content" required />
        <button className="btn custom-btn-primary" type="submit">🚀 Publish Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
