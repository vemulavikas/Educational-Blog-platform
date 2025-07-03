// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import EducationalBlog from "./pages/EducationalBlog";
import AuthPage from "./pages/AuthPage";
import BlogDashboard from "./pages/BlogDashboard";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Profile from "./pages/Profile";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EducationalBlog />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={user ? <BlogDashboard /> : <Navigate to="/login" />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/create" element={user ? <CreateBlog /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={user ? <EditBlog /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
