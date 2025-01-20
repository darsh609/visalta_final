import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Auth.css";
import { FaEye, FaEyeSlash, FaUserShield, FaGraduationCap } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"
import { ACCOUNT_TYPE } from "../utils/constants"
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Student", // Default account type set to Student
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  };

  const handleAccountTypeChange = (accountType) => {
    setFormData({ ...formData, accountType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match!");
      return;
    }
  
    const signupData = {
      ...formData,
    };
  
    try {
      // Dispatch signup data
      dispatch(setSignupData(signupData));
  
      // Wait for OTP dispatch to complete
      await dispatch(sendOtp(formData.email, navigate));
  
      // Clear form only after successful OTP dispatch
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "Student",
      });
  
      // Success feedback can be shown here if needed
    } catch (error) {
      // Log or handle error (optional)
      console.error("Failed to send OTP:", error);
    }
  };
  

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
          Join the Visalta Community
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
          Empowering students to achieve greatness.
        </p>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
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
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
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

        <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between" }}>
          <div
            onClick={() => handleAccountTypeChange("Admin")}
            style={{
              flex: 1,
              padding: "1rem",
              marginRight: "0.5rem",
              borderRadius: "10px",
              background: formData.accountType === "Admin" ? "#5e60ce" : "#333",
              color: "#fff",
              cursor: "pointer",
              textAlign: "center",
              transition: "background 0.3s",
            }}
          >
            <FaUserShield size={24} style={{ marginBottom: "0.5rem" }} />
            <p style={{ margin: 0 }}>Admin</p>
          </div>
          <div
            onClick={() => handleAccountTypeChange("Student")}
            style={{
              flex: 1,
              padding: "1rem",
              marginLeft: "0.5rem",
              borderRadius: "10px",
              background: formData.accountType === "Student" ? "#5e60ce" : "#333",
              color: "#fff",
              cursor: "pointer",
              textAlign: "center",
              transition: "background 0.3s",
            }}
          >
            <FaGraduationCap size={24} style={{ marginBottom: "0.5rem" }} />
            <p style={{ margin: 0 }}>Student</p>
          </div>
        </div>

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

        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
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
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {passwordMatchError && (
          <p style={{ color: "red", marginBottom: "1rem", fontSize: "0.9rem" }}>
            {passwordMatchError}
          </p>
        )}

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
          Sign Up
        </motion.button>

        <p style={{ color: "#aaa", marginTop: "1rem" }}>
          Already have an account? <a href="/login" style={{ color: "#5e60ce" }}>Login</a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
