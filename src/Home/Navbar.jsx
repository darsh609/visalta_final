import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="Navbar fixed z-[10] w-full p-4 md:p-8 font-['Neue Montreal'] flex justify-between items-center bg-transparent text-white">
      {/* Logo */}
      <motion.div
        className="logo text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedLogo/>
      </motion.div>

      {/* Links for larger screens */}
      <div className="hidden md:flex items-center gap-6">
        {
         user?.accountType === 'Admin' && (<motion.div
          onClick={() => navigate("AdminPanel")}
          className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
          whileHover={{ scale: 1.1 }}
        >
            AdminPanel
          
        </motion.div>)

        }
      
      <motion.div
          onClick={() => navigate("update")}
          className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
          whileHover={{ scale: 1.1 }}
        >
Alerts
        </motion.div>
        <motion.div
          onClick={() => navigate("insight")}
          className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
          whileHover={{ scale: 1.1 }}
        >
          Insight
        </motion.div>
       
        <motion.div
          onClick={() => navigate("contact")}
          className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
          whileHover={{ scale: 1.1 }}
        >
          Contact
        </motion.div>

        {!user ? (
          <motion.div
            onClick={() => navigate("login")}
            className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
            whileHover={{ scale: 1.1 }}
          >
            Login
          </motion.div>
        ) : (
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("my-profile")}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={user.image}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-green-400"
            />
          </motion.div>
        )}
      </div>

      {/* Hamburger Menu for smaller screens */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-3xl focus:outline-none"
        >
          &#9776;
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-zinc-800 rounded-lg shadow-lg p-4 flex flex-col gap-4 w-48">
          {
         user?.accountType === 'Admin' && (<motion.div
          onClick={() => navigate("AdminPanel")}
          className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
          whileHover={{ scale: 1.1 }}
        >
            AdminPanel
          
        </motion.div>)

        }
        <div
            onClick={() => {
              navigate("update");
              setMenuOpen(false);
            }}
            className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
          >
            Alerts
          </div>
          <div
            onClick={() => {
              navigate("insight");
              setMenuOpen(false);
            }}
            className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
          >
            Insight
          </div>
          
          <div
            onClick={() => {
              navigate("contact");
              setMenuOpen(false);
            }}
            className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
          >
            Contact
          </div>

          {!user ? (
            <div
              onClick={() => {
                navigate("login");
                setMenuOpen(false);
              }}
              className="text-lg capitalize font-light cursor-pointer hover:text-green-400 transition"
            >
              Login
            </div>
          ) : (
            <div
              className="flex items-center gap-3 cursor-pointer hover:text-green-400"
              onClick={() => {
                navigate("my-profile");
                setMenuOpen(false);
              }}
            >
              <img
                src={user.image}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-green-400"
              />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
