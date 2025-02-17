import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { FaCompass, FaArrowLeft, FaRedoAlt } from 'react-icons/fa'

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
    dispatch(
      signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate)
    );
  };

  return (
    <motion.div
    className="relative min-h-screen flex justify-center items-center bg-zinc-900 font-['Poppins'] p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Floating particles */}
    {/* <motion.div
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
            repeatType: 'reverse',
          }}
        />
      ))}
    </motion.div> */}

    {loading ? (
      <div className="spinner" />
    ) : (
      <motion.div
        className="bg-gray-100 p-8 md:p-12 rounded-lg shadow-2xl backdrop-blur-sm w-full max-w-xl mx-4 border border-[#1db954]/20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 text-center"
        >
          <FaCompass className="text-6xl text-[#1db954] mx-auto mb-6 animate-spin-slow" />
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Verify Your Email
          </h2>
          <motion.p
            className="text-xl md:text-xl text-[#1db954] italic font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Enter the verification code we've sent to your email
          </motion.p>
        </motion.div>

        <form onSubmit={handleVerifyAndSignup} className="space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  // Increase OTP input size + responsive
                  className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] text-2xl bg-zinc-800 border border-[#1db954]/30 rounded-lg text-white text-center focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20 transition-all duration-300"
                />
              )}
              containerStyle={{
                justifyContent: 'center',
                gap: '1rem', // Adjust gap as needed
              }}
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, backgroundColor: '#1db954' }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 text-xl bg-[#1db954] text-white font-bold rounded-lg shadow-lg shadow-[#1db954]/20 transition-all duration-300"
          >
            Verify Email
          </motion.button>
        </form>

        <motion.div
          className="mt-8 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/signup"
            className="text-lg text-[#1db954] hover:text-[#1db954]/80 transition-all duration-300 flex items-center gap-2"
          >
            <FaArrowLeft />
            Back to Signup
          </Link>

          <button
            onClick={() => dispatch(sendOtp(signupData.email))}
            className="text-lg text-[#1db954] hover:text-[#1db954]/80 transition-all duration-300 flex items-center gap-2"
          >
            <FaRedoAlt />
            Resend Code
          </button>
        </motion.div>
      </motion.div>
    )}
  </motion.div>
  );
}

export default VerifyEmail;
