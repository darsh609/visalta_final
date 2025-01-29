import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
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
      {loading ? (
        <div className="spinner"></div>
      ) : (
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
            Choose New Password
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
            Almost done. Enter your new password and you’re all set.
          </p>

          <form onSubmit={handleOnSubmit}>
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <p style={{ marginBottom: "0.5rem", color: "#ffffff", fontSize: "1rem" }}>
                New Password <sup style={{ color: "#ff6b6b" }}>*</sup>
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#333",
                  borderRadius: "5px",
                  padding: "0.5rem",
                }}
              >
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    outline: "none",
                    padding: "0.5rem",
                  }}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ cursor: "pointer", color: "#5e60ce" }}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <p style={{ marginBottom: "0.5rem", color: "#ffffff", fontSize: "1rem" }}>
                Confirm New Password <sup style={{ color: "#ff6b6b" }}>*</sup>
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#333",
                  borderRadius: "5px",
                  padding: "0.5rem",
                }}
              >
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    outline: "none",
                    padding: "0.5rem",
                  }}
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{ cursor: "pointer", color: "#5e60ce" }}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
              Reset Password
            </motion.button>
          </form>

          <div
            style={{
              marginTop: "1rem",
              color: "#aaa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Link to="/login" style={{ color: "#5e60ce", display: "flex", alignItems: "center" }}>
              <BiArrowBack />
              Back to Login
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default UpdatePassword;
