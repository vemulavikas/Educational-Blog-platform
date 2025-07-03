import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";

const EducationalBlog = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid bg-light py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark">Educational Blog</h1>
        <p className="text-muted">
          Discover insightful articles on programming, data science, and technical writing.
          Learn from experts and share your knowledge with the community.
        </p>
        <div className="mt-3 d-flex justify-content-center gap-3">
          <button className="btn custom-btn-primary px-4" onClick={() => navigate("/login?mode=login")}>
            Sign In
          </button>
          <button className="btn custom-btn-outline px-4" onClick={() => navigate("/login?mode=register")}>
            Create Account
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <img src="https://images.prismic.io/corporate-website/Clean-code-2.jpg?auto=compress,format&rect=0,102,1366,705&w=1000&h=516" alt="React Development" className="card-img-top rounded-top-4"/>
              <div className="card-body">
                <span className="badge custom-badge-primary">Programming</span>
                <h5 className="card-title mt-2">Getting Started with React Development</h5>
                <p className="card-text text-muted">
                  Learn the fundamentals of React and start building modern web applications with this comprehensive guide.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRmsWcoVw64IcwzVSwahxvQg36eM_MO5clcg&s" alt="Machine Learning" className="card-img-top rounded-top-4"/>
              <div className="card-body">
                <span className="badge custom-badge-secondary">Data Science</span>
                <h5 className="card-title mt-2">Understanding Machine Learning Basics</h5>
                <p className="card-text text-muted">
                  Explore the core concepts of machine learning and discover how to implement basic algorithms in your projects.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <img src="https://miro.medium.com/v2/resize:fit:1400/1*xnfXT8GjVCKj70Kbp6VXjQ.jpeg" alt="Technical Writing" className="card-img-top rounded-top-4"/>
              <div className="card-body">
                <span className="badge custom-badge-tertiary">Writing</span>
                <h5 className="card-title mt-2">The Art of Technical Writing</h5>
                <p className="card-text text-muted">
                  Master the skills needed to create clear, concise, and effective technical documentation for various audiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalBlog;