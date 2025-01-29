import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
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
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
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
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password."
              : `We've sent reset instructions to ${email}.`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p
                  style={{
                    marginBottom: "0.5rem",
                    color: "#ffffff",
                    fontSize: "1rem",
                  }}
                >
                  Email Address <sup style={{ color: "#ff6b6b" }}>*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "5px",
                    border: "none",
                    background: "#333",
                    color: "#fff",
                    marginBottom: "1rem",
                  }}
                />
              </label>
            )}

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
              {!emailSent ? "Submit" : "Resend Email"}
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

export default ForgotPassword;
