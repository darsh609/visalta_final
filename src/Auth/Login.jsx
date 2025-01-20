import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Auth.css"; // Add your CSS file for styling
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/operations/authAPI"


export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login Data: ", formData);
//   };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }
  

  return (
    <motion.div
      className="auth-page-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #121212, #1a1a1a)",
        fontFamily: '"Poppins", sans-serif',
        padding: "1rem",
        overflowY: "auto",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="auth-form-container"
        style={{
          background: "#1f1f1f",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
          margin: "1rem auto",
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 style={{ color: "#ffffff", marginBottom: "1rem", fontSize: "2rem" }}>
          Welcome Back to Visalta
        </h2>

        <p
          style={{
            color: "#cccccc",
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Shaping the future, one student at a time.
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
          style={{
            marginBottom: "1rem",
            width: "100%",
            padding: "0.8rem",
            borderRadius: "5px",
            border: "none",
            background: "#333",
            color: "#fff",
          }}
        />

        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "5px",
              border: "none",
              background: "#333",
              color: "#fff",
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#5e60ce",
              fontSize: "1.2rem",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "0.8rem",
            borderRadius: "5px",
            border: "none",
            background: "#5e60ce",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </motion.button>

        <p style={{ color: "#aaa", marginTop: "1rem" }}>
          Don't have an account? <a href="/signup" style={{ color: "#5e60ce" }}>Sign Up</a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;