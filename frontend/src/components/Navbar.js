import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-2">
      <Link to="/" className="navbar-brand text-white fw-bold">
        EduBlog
      </Link>
    </nav>
  );
};

export default Navbar;

