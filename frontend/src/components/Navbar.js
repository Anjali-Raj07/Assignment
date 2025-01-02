import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>ASSIGNMENT</h1>
      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/logout">Logout</Link>

      </div>
    </nav>
  );
};

export default Navbar;
