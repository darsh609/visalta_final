import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Auth.css"; // Add your CSS file for styling
import { FaEye, FaEyeSlash, FaUser, FaLock, FaRocket,FaCompass } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";
import { FaArrowUpLong } from "react-icons/fa6";
import AnimatedLogo from "../Home/AnimatedLogo";


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
    <div className="auth-page-container relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#1db954]">
      <div className="flex items-end py-11 px-8"
      onClick={() => navigate("/")}>
      <AnimatedLogo/>
      </div>
    <motion.div
    className="flex justify-center items-center font-['Poppins'] p-4 overflow-y-auto"
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
      className="auth-form-container bg-black/80 p-8 rounded-lg shadow-2xl backdrop-blur-sm w-full max-w-md m-4 border border-[#1db954]/20"
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
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back to Visalta</h2>
        <motion.p
          className="text-[#1db954] text-lg italic font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Navigating student's life
        </motion.p>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          className="relative"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1db954]" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-10 py-3 bg-gray-900 text-white rounded-lg border border-[#1db954]/30 focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 transition-all duration-300"
          />
        </motion.div>

        <motion.div
          className="relative"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1db954]" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-10 py-3 bg-gray-900 text-white rounded-lg border border-[#1db954]/30 focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 transition-all duration-300"
          />
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#1db954] hover:text-[#1aaa4c] transition-colors duration-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </motion.span>
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, backgroundColor: '#1db954' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="w-full py-3 bg-[#1db954] text-white font-bold rounded-lg shadow-lg shadow-[#1db954]/20 hover:shadow-[#1db954]/40 transition-all duration-300"
        >
          Login
        </motion.button>
      </div>

      <motion.div
        className="mt-6 space-y-2 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>
          Don't have an account?{" "}
          <a href="/signup" className="text-[#1db954] hover:text-[#1aaa4c] transition-colors duration-300">
            Sign Up
          </a>
        </p>
        <p>
          <span
            onClick={() => navigate("/forgot-password")}
            className="cursor-pointer text-[#1db954] hover:text-[#1aaa4c] transition-colors duration-300 underline font-medium"
          >
            Forgot Password?
          </span>
        </p>
      </motion.div>
    </motion.div>
  </motion.div>
    </div>


    
  );
};

export default Login;



// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaEye, FaEyeSlash, FaArrowUpLong, FaUser, FaLock, FaRocket } from 'react-icons/fa';

// const LoginPage = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, navigate }) => {
//   return (
//     <motion.div
//       className="auth-page-container relative flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 font-['Poppins'] p-4 overflow-y-auto"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       {/* Floating particles effect */}
//       <motion.div
//         className="absolute inset-0 pointer-events-none"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.5 }}
//         transition={{ duration: 2 }}
//       >
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-green-500 rounded-full"
//             initial={{
//               x: Math.random() * window.innerWidth,
//               y: Math.random() * window.innerHeight,
//             }}
//             animate={{
//               y: [0, -20, 0],
//               opacity: [0.2, 1, 0.2],
//             }}
//             transition={{
//               duration: 2 + Math.random() * 2,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//           />
//         ))}
//       </motion.div>

//       <motion.div
//         className="auth-form-container bg-black/80 p-8 rounded-lg shadow-2xl backdrop-blur-sm w-full max-w-md m-4 border border-green-500/20"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 120 }}
//       >
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.5 }}
//           className="mb-6"
//         >
//           <FaRocket className="text-green-400 text-4xl mx-auto mb-4" />
//           <h2 className="text-3xl font-bold text-white mb-2">Welcome Back to Visalta</h2>
//           <motion.p
//             className="text-green-400 text-lg italic font-medium"
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             Shaping the future, one student at a time.
//           </motion.p>
//         </motion.div>

//         <div className="space-y-4">
//           <motion.div
//             className="relative"
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.6 }}
//           >
//             <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-10 py-3 bg-gray-900 text-white rounded-lg border border-green-500/30 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
//             />
//           </motion.div>

//           <motion.div
//             className="relative"
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.7 }}
//           >
//             <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-10 py-3 bg-gray-900 text-white rounded-lg border border-green-500/30 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
//             />
//             <motion.span
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-green-400 hover:text-green-300 transition-colors duration-300"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </motion.span>
//           </motion.div>

//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.02, backgroundColor: '#22c55e' }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleSubmit}
//             className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300"
//           >
//             Login
//           </motion.button>
//         </div>

//         <motion.div
//           className="mt-6 space-y-2 text-gray-400"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           <p>
//             Don't have an account?{" "}
//             <a href="/signup" className="text-green-400 hover:text-green-300 transition-colors duration-300">
//               Sign Up
//             </a>
//           </p>
//           <p>
//             <span
//               onClick={() => navigate("/forgot-password")}
//               className="cursor-pointer text-green-400 hover:text-green-300 transition-colors duration-300 underline font-medium"
//             >
//               Forgot Password?
//             </span>
//           </p>
//         </motion.div>
//       </motion.div>

//       <motion.div
//         className="absolute top-5 left-5"
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.9 }}
//       >
//         <div
//           onClick={() => navigate("/")}
//           className="group px-5 py-2 border border-green-500/30 text-white rounded-full hover:bg-green-500 hover:border-green-500 transition-all duration-300 flex items-center gap-2 cursor-pointer"
//         >
//           Home
//           <div className="w-2 h-2 bg-white rounded-full group-hover:w-5 group-hover:h-5 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center">
//             <FaArrowUpLong className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default LoginPage;