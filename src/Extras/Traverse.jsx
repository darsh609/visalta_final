

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaChurch, FaPlaneDeparture, FaGlobe } from "react-icons/fa";
import Worship from "./worship";
import Travel from "./Travel";
import Oneday from "./Oneday";

const Traverse = () => {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Initialize activeTab from localStorage if available
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab !== null ? Number(savedTab) : 0;
  });

  // Update localStorage whenever activeTab changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const tabs = [
    {
      title: "Sacred Pilgrimage",
      icon: <FaChurch className="mr-2 text-xl" />,
      component: <Worship />,
    },
    {
      title: "Daylight Escapes",
      icon: <FaClock className="mr-2 text-xl" />,
      component: <Oneday />,
    },
    {
      title: "Extended Retreat",
      icon: <FaPlaneDeparture className="mr-2 text-xl" />,
      component: <Travel />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 text-white">
      <div className="container mx-auto px-4 sm:px-8 py-8">
        {/* Animated Header with Icon */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaGlobe className="text-4xl md:text-6xl text-[#f26668] mb-2" />
          </motion.div>
          <motion.h1
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-4xl md:text-6xl font-bold text-center"
          >
            Chart Your Next Expedition
          </motion.h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-lg md:text-xl text-zinc-400 mb-8"
        >
          Uncover unforgettable journeys designed to spark your wanderlust.
        </motion.p>

        {/* Toggle Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          {tabs.map((tab, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-colors duration-300 
                ${
                  activeTab === index
                    ? "bg-[#f26668] text-white border-[#f26668]"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white"
                }`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Animated Content */}
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
          >
            {tabs[activeTab].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Traverse;
