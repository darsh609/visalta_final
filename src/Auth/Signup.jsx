import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Auth.css";
import { 
  FaEye, 
  FaEyeSlash, 
  FaUserShield, 
  FaGraduationCap, 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCompass 
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import AnimatedLogo from "../Home/AnimatedLogo";

import { sendOtp } from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"
import { ACCOUNT_TYPE } from "../utils/constants"
=======
import { sendOtp } from "../services/operations/authAPI";
import { setSignupData } from "../slices/authSlice";
import { ACCOUNT_TYPE } from "../utils/constants";
>>>>>>> Stashed changes
import { FaArrowUpLong } from "react-icons/fa6";

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
    }));
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
  
    const signupData = { ...formData };
  
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
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };
  
  return (
    <div className="auth-page-container relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#1db954]">

    <div className="flex items-end py-11 px-8"
      onClick={() => navigate("/")}>
      <AnimatedLogo/>
      </div>
    <motion.div
<<<<<<< Updated upstream
    className=" flex justify-center items-center font-['Poppins']"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Floating particles effect */}
    <motion.div
      className="absolute inset-0 pointer-events-none"
=======
      className="auth-page-container relative flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#1db954] font-['Poppins'] p-4 overflow-y-auto"
>>>>>>> Stashed changes
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating particles effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#1db954] rounded-full"
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

      <motion.div
        className="auth-form-container bg-black/80 p-8 md:p-10 rounded-lg shadow-2xl backdrop-blur-sm w-full max-w-md m-4 border border-[#1db954]/20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <FaCompass className="text-[#1db954] text-6xl mx-auto mb-4 animate-spin-slow" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Join the Visalta Community
          </h2>
          <motion.p
            className="text-[#1db954] text-lg md:text-xl italic font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Navigating Student's Life
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {/* First Name */}
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1db954]" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-8 py-2 text-sm md:px-10 md:py-3 md:text-base bg-gray-900 text-white rounded-lg border border-[#1db954]/30 focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 transition-all duration-300"
            />
          </motion.div>

          {/* Last Name */}
          <motion.div
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1db954]" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-8 py-2 text-sm md:px-10 md:py-3 md:text-base bg-gray-900 text-white rounded-lg border border-[#1db954]/30 focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 transition-all duration-300"
            />
          </motion.div>

          {/* Account Type Toggle */}
          <motion.div
            className="flex gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div
              onClick={() => handleAccountTypeChange("Admin")}
              className={`flex-1 p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-300 flex flex-col items-center ${
                formData.accountType === "Admin"
                  ? "bg-[#1db954] shadow-lg shadow-[#1db954]/20"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <FaUserShield className="text-2xl mb-2" />
              <p className="text-xs md:text-sm">Admin</p>
            </div>
            <div
              onClick={() => handleAccountTypeChange("Student")}
              className={`flex-1 p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-300 flex flex-col items-center ${
                formData.accountType === "Student"
                  ? "bg-[#1db954] shadow-lg shadow-[#1db954]/20"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <FaGraduationCap className="text-2xl mb-2" />
              <p className="text-xs md:text-sm">Student</p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1db954]" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-8 py-2 text-sm md:px-10 md:py-3 md:text-base bg-gray-900 text-white rounded-lg border border-[#1db954]/30 focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 transition-all duration-300"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1db954]" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-8 py-2 text-sm md:px-10 md:py-3 md:text-base bg-gray-900 text-white rounded-lg border border-[#1db954]/30 focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 transition-all duration-300"
            />
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#1db954] hover:text-[#1db954]/80 transition-colors duration-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.span>
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            className="relative"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1db954]" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-8 py-2 text-sm md:px-10 md:py-3 md:text-base bg-gray-900 text-white rounded-lg border border-[#1db954]/30 focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 transition-all duration-300"
            />
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#1db954] hover:text-[#1db954]/80 transition-colors duration-300"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.span>
          </motion.div>

          {/* Password Match Error */}
          {passwordMatchError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs md:text-sm"
            >
              {passwordMatchError}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, backgroundColor: "#1db954" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="w-full py-3 bg-[#1db954] text-white font-bold rounded-lg shadow-lg shadow-[#1db954]/20 hover:shadow-[#1db954]/40 transition-all duration-300 text-sm md:text-base"
          >
            Sign Up
          </motion.button>
        </div>

        <motion.div
          className="mt-6 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#1db954] hover:text-[#1db954]/80 transition-colors duration-300"
            >
              Login
            </a>
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-5 left-5"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div
          onClick={() => navigate("/")}
          className="group px-5 py-2 border border-[#1db954]/30 text-white rounded-full hover:bg-[#1db954] hover:border-[#1db954] transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          Home
          <div className="w-2 h-2 bg-white rounded-full group-hover:w-5 group-hover:h-5 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center">
            <FaArrowUpLong className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
<<<<<<< Updated upstream

    <motion.div
      className="absolute top-5 left-5"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
    </motion.div>
  </motion.div>
    </div>

);
}

=======
  );
};
>>>>>>> Stashed changes

export default Signup;
