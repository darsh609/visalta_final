import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCompass, FaArrowLeft, FaEnvelope } from 'react-icons/fa';
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
    className="auth-page-container relative flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#1db954] font-['Poppins'] p-4 overflow-y-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Floating particles */}
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 2 }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#1db954] rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </motion.div>

    {loading ? (
      <div className="spinner" />
    ) : (
      <motion.div
        className="bg-black/80 p-8 md:p-12 rounded-lg shadow-2xl backdrop-blur-sm w-full max-w-xl mx-4 border border-[#1db954]/20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 text-center"
        >
          <FaCompass className="text-6xl text-[#1db954] mx-auto mb-6 animate-spin-slow" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h2>
          <motion.p
            className="text-xl md:text-2xl text-[#1db954] italic font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {!emailSent
              ? "Have no fear. We'll help you reset your password."
              : `We've sent reset instructions to ${email}`}
          </motion.p>
        </motion.div>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          {!emailSent && (
            <motion.div
              className="relative"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1db954] text-xl" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-12 py-4 text-lg md:px-16 md:py-5 md:text-xl bg-gray-900 text-white rounded-lg border border-[#1db954]/30 focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 transition-all duration-300"
              />
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, backgroundColor: "#1db954" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 md:py-5 text-xl md:text-2xl bg-[#1db954] text-white font-bold rounded-lg shadow-lg shadow-[#1db954]/20 hover:shadow-[#1db954]/40 transition-all duration-300"
          >
            {!emailSent ? "Submit" : "Resend Email"}
          </motion.button>
        </form>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/login"
            className="text-lg text-[#1db954] hover:text-[#1db954]/80 transition-all duration-300 flex items-center gap-2"
          >
            <FaArrowLeft />
            Back to Login
          </Link>
        </motion.div>
      </motion.div>
    )}
  </motion.div>
);
}

export default ForgotPassword;
