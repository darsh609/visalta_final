

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast"; // Import react-hot-toast
import { styles } from "../styles";
import { EarthCanvas, StarsCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import AnimatedLogo from "../Home/AnimatedLogo";
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const navigate = useNavigate();

  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    impact: "",
    suggestion: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Submitting your feedback...");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/feedback/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            category: form.category,
            impactLevel: form.impact,
            suggestion: form.suggestion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit feedback.");
      }

      setLoading(false);
      toast.dismiss(); // Remove the loading toast
      toast.success("Feedback submitted successfully!");
      setForm({
        name: "",
        email: "",
        category: "",
        impact: "",
        suggestion: "",
      });
    } catch (error) {
      setLoading(false);
      toast.dismiss(); // Remove the loading toast
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 w-screen bg-zinc-900 overflow-y-scroll ">
    {/* Animated Logo in the top-left corner with increased top spacing */}
    <div className="absolute top-6 left-4 sm:top-8 sm:left-6 lg:top-10 lg:left-8"
      onClick={() => navigate("/")}>
      <AnimatedLogo className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
    </div>
  
    <StarsCanvas />
  
    {/* Center container for large screens */}
    <div className="w-full h-full flex flex-col mt-10 lg:justify-center lg:items-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row">
        {/* Form Section - Left Half */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="w-full lg:w-1/2 flex items-center justify-center p-4"
        >
          <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col justify-center space-y-4 md:space-y-6 py-8">
            <div>
              <p className="text-[#1DB954] font-medium mb-1 text-xs sm:text-sm">
                Help Us Improve
              </p>
              <h3 className="text-white font-black text-xl sm:text-2xl lg:text-3xl">
                Share Your Feedback
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Your feedback helps us create a better experience.
              </p>
            </div>
  
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 sm:space-y-5"
            >
              {/* Name Input */}
              <label className="flex flex-col">
                <span className="text-white text-xs sm:text-sm mb-1">
                  Your Name
                </span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    className="bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 placeholder:text-zinc-500 text-white outline-none text-xs sm:text-sm w-full"
                  />
                </div>
              </label>
  
              {/* Email Input */}
              <label className="flex flex-col">
                <span className="text-white text-xs sm:text-sm mb-1">
                  Your Email
                </span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 placeholder:text-zinc-500 text-white outline-none text-xs sm:text-sm w-full"
                  />
                </div>
              </label>
  
              {/* Category Dropdown */}
              <label className="flex flex-col">
                <span className="text-white text-xs sm:text-sm mb-1">
                  Category
                </span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 text-white outline-none text-xs sm:text-sm w-full"
                  >
                    <option value="" className="bg-zinc-900">
                      Select category
                    </option>
                    <option value="performance" className="bg-zinc-900">
                      Performance Issues
                    </option>
                    <option value="feature" className="bg-zinc-900">
                      Feature Request
                    </option>
                    <option value="bug" className="bg-zinc-900">
                      Bug Report
                    </option>
                    <option value="ui" className="bg-zinc-900">
                      User Interface
                    </option>
                    <option value="other" className="bg-zinc-900">
                      Other
                    </option>
                  </select>
                </div>
              </label>
  
              {/* Impact Dropdown */}
              <label className="flex flex-col">
                <span className="text-white text-xs sm:text-sm mb-1">
                  Impact Level
                </span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <select
                    name="impact"
                    value={form.impact}
                    onChange={handleChange}
                    className="bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 text-white outline-none text-xs sm:text-sm w-full"
                  >
                    <option value="" className="bg-zinc-900">
                      Select impact
                    </option>
                    <option value="critical" className="bg-zinc-900">
                      Critical
                    </option>
                    <option value="major" className="bg-zinc-900">
                      Major
                    </option>
                    <option value="minor" className="bg-zinc-900">
                      Minor
                    </option>
                    <option value="suggestion" className="bg-zinc-900">
                      Suggestion
                    </option>
                  </select>
                </div>
              </label>
  
              {/* Suggestion Textarea */}
              <label className="flex flex-col">
                <span className="text-white text-xs sm:text-sm mb-1">
                  Your Suggestion
                </span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <textarea
                    name="suggestion"
                    value={form.suggestion}
                    onChange={handleChange}
                    placeholder="Describe your suggestion or the issue you're experiencing..."
                    className="bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 placeholder:text-zinc-500 text-white outline-none text-xs sm:text-sm w-full h-12 sm:h-16 resize-none"
                  />
                </div>
              </label>
  
              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-transparent py-1.5 sm:py-2 px-4 sm:px-6 rounded-full outline-none w-fit text-white font-medium hover:bg-[#1DB954] border-2 border-[#1DB954] hover:border-transparent transition-all duration-300 text-xs sm:text-sm"
                >
                  {loading ? "Sending..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
  
        {/* Earth Canvas - Right Half with reduced size on small screens */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="w-full lg:w-1/2 flex items-center justify-center p-4  h-80 sm:h-[400px] lg:h-full"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </div>
  </div>
  
  
);
};


export default SectionWrapper(FeedbackForm, "feedback");
