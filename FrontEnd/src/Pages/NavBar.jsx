import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NavBar.css';

const Navbar = () => {
    const navigate = useNavigate();
  
    return (
      <nav className="navbar">
        <button onClick={() => navigate("/dashboard")} className="nav-btn">Dashboard</button>
        <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
      </nav>
    );
  };

export default Navbar;