import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseconfig";  
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Login.css";
import { FaGoogle, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(); // Get the actual token
      localStorage.setItem('token', token); // Store the actual token
      alert("✅ Logged in successfully!");
      navigate("/"); // Redirect to home page
      window.location.reload();
    } catch (error) {
      alert("❌ Login failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(); // Get the actual token
      localStorage.setItem('token', token); // Store the actual token
      alert("✅ Google Login successful!");
      navigate("/"); // Redirect to home page
      window.location.reload();
    } catch (error) {
      alert("❌ Google Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="input-btn"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="input-btn"
        />
        <button type="submit" className="login-btn">
          <FaSignInAlt /> Login
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="google-btn">
        <FaGoogle /> Sign in with Google
      </button>
      <button onClick={() => navigate("/register")} className="register-btn">
        <FaUserPlus /> Register
      </button>
    </div>
  );
};

export default Login;
