import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Auth.css"; // Add your CSS file for styling
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";
import { FaArrowUpLong } from "react-icons/fa6";


export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div>
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

        <div style={{ marginTop: "1rem", color: "#aaa" }}>
          <p>
            Don't have an account?{" "}
            <a href="/signup" style={{ color: "#5e60ce" }}>
              Sign Up
            </a>
          </p>
          <p>
            <span
              onClick={() => navigate("/forgot-password")}
              style={{
                cursor: "pointer",
                color: "#5e60ce",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              Forgot Password?
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>

    <div className="start flex items-center gap-2" style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <div
                    onClick={() => navigate("/")}
                    className="px-5 py-2 border-[1px] text-white rounded-full font-lighter text-md uppercase tracking-tighter hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                    Home
                    <div className="w-2 h-2 bg-white rounded-full group-hover:w-5 group-hover:h-5 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center">
                        <FaArrowUpLong className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>
            </div>
    </div>
    
  );
};

export default Login;
