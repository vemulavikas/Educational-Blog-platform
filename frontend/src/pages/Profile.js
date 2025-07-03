import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import BlogCard from "../components/BlogCard";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container py-5">
      <button className="btn btn-link mb-4" onClick={() => navigate("/dashboard")}>
        <FaArrowLeft /> Back to Blogs
      </button>

      <h2 className="fw-bold mb-3">My Profile</h2>
      <p className="text-muted mb-4">Manage your blog posts and account settings</p>

      <div className="card p-4 mb-5 shadow-sm">
        <h4 className="fw-bold mb-3">Account Information</h4>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      <h4 className="fw-bold mb-3">My Blog Posts</h4>
      {blogs.length === 0 ? (
        <p>You haven’t written any blogs yet.</p>
      ) : (
        <div className="row g-4">
          {blogs.map((blog) => (
            <div className="col-md-4" key={blog._id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
