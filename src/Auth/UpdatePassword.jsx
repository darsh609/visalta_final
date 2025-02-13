import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { FaCompass } from "react-icons/fa";

// import { BiArrowBack } fimport { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";rom "react-icons/bi";

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
    className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#1db954] font-['Poppins'] p-4 overflow-y-auto"
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
        className="bg-black/80 p-8 md:p-10 rounded-lg shadow-2xl backdrop-blur-sm w-full max-w-md m-4 border border-[#1db954]/20 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {/* Spinning icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <FaCompass className="text-[#1db954] text-6xl mx-auto mb-4 animate-spin-slow" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Choose New Password
          </h2>
          <motion.p
            className="text-[#1db954] text-lg md:text-xl italic font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Set your new password
          </motion.p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-4 text-left">
          {/* New Password */}
          <div>
            <label className="block mb-1 text-white font-medium text-sm md:text-base">
              New Password <sup className="text-red-500">*</sup>
            </label>
            <div className="relative flex items-center bg-gray-800 rounded-md px-3 py-2">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="flex-1 bg-transparent border-none text-white outline-none text-sm md:text-base"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-[#1db954] ml-2"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-white font-medium text-sm md:text-base">
              Confirm New Password <sup className="text-red-500">*</sup>
            </label>
            <div className="relative flex items-center bg-gray-800 rounded-md px-3 py-2">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="flex-1 bg-transparent border-none text-white outline-none text-sm md:text-base"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer text-[#1db954] ml-2"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, backgroundColor: "#1db954" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 mt-4 bg-[#1db954] text-white font-bold rounded-md shadow-md shadow-[#1db954]/20 hover:shadow-[#1db954]/40 transition-all duration-300 text-sm md:text-base"
          >
            Reset Password
          </motion.button>
        </form>

        {/* Back to Login */}
        <div className="mt-4 text-gray-300 flex justify-center gap-2 items-center">
          <Link
            to="/login"
            className="flex items-center gap-2 text-[#1db954] hover:text-[#1db954]/80 transition-colors duration-300"
          >
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
