import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-zinc-900 min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center"
        >
          <div className="spinner"></div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="max-w-[500px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-xl p-6 lg:p-8 shadow-xl border border-zinc-700"
        >
          <h1 className="text-green-400 font-bold text-[2rem] leading-[2.5rem] text-center">
            Verify Email
          </h1>
          <p className="text-zinc-300 text-center mt-4 text-[1.125rem]">
            Enter the verification code we’ve sent to your email.
          </p>
          <form onSubmit={handleVerifyAndSignup} className="mt-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] bg-zinc-800 border border-zinc-700 rounded-lg text-green-400 text-center text-lg focus:outline-green-500"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 8px",
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-green-500 text-zinc-900 py-3 rounded-lg mt-6 font-semibold shadow-lg hover:bg-green-400 transition-all duration-300"
            >
              Verify Email
            </motion.button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link to="/signup" className="text-zinc-300 flex items-center gap-x-2 hover:text-green-400 transition-all">
              <BiArrowBack /> Back to Signup
            </Link>
            <button
              className="text-green-400 flex items-center gap-x-2 hover:text-green-300 transition-all"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer /> Resend
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default VerifyEmail;
