import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas, StarsCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const FeedbackForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Product Team",
          from_email: form.email,
          to_email: "feedback@example.com",
          message: `Category: ${form.category}\nImpact: ${form.impact}\nSuggestion: ${form.suggestion}`,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you for your feedback! We'll review your suggestion and work on improvements.");
          setForm({
            name: "",
            email: "",
            category: "",
            impact: "",
            suggestion: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-zinc-900">
      <StarsCanvas />
      <div className="w-full h-full flex">
        {/* Form Section - Left Half */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="w-1/2 h-full flex items-center"
        >
          <div className="w-full px-12 flex flex-col justify-center space-y-6">
            <div>
              <p className="text-[#1DB954] font-medium mb-1">Help Us Improve</p>
              <h3 className="text-white font-black text-3xl">Share Your Feedback</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Your feedback helps us create a better experience.
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5"
            >
              <label className="flex flex-col">
                <span className="text-white text-sm mb-1">Your Name</span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    className="bg-transparent py-2 px-4 placeholder:text-zinc-500 text-white outline-none text-sm w-full"
                  />
                </div>
              </label>

              <label className="flex flex-col">
                <span className="text-white text-sm mb-1">Your Email</span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="bg-transparent py-2 px-4 placeholder:text-zinc-500 text-white outline-none text-sm w-full"
                  />
                </div>
              </label>

              <label className="flex flex-col">
                <span className="text-white text-sm mb-1">Category</span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="bg-transparent py-2 px-4 text-white outline-none text-sm w-full"
                  >
                    <option value="" className="bg-zinc-900">Select category</option>
                    <option value="performance" className="bg-zinc-900">Performance Issues</option>
                    <option value="feature" className="bg-zinc-900">Feature Request</option>
                    <option value="bug" className="bg-zinc-900">Bug Report</option>
                    <option value="ui" className="bg-zinc-900">User Interface</option>
                    <option value="other" className="bg-zinc-900">Other</option>
                  </select>
                </div>
              </label>

              <label className="flex flex-col">
                <span className="text-white text-sm mb-1">Impact Level</span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <select
                    name="impact"
                    value={form.impact}
                    onChange={handleChange}
                    className="bg-transparent py-2 px-4 text-white outline-none text-sm w-full"
                  >
                    <option value="" className="bg-zinc-900">Select impact</option>
                    <option value="critical" className="bg-zinc-900">Critical</option>
                    <option value="major" className="bg-zinc-900">Major</option>
                    <option value="minor" className="bg-zinc-900">Minor</option>
                    <option value="suggestion" className="bg-zinc-900">Suggestion</option>
                  </select>
                </div>
              </label>

              <label className="flex flex-col">
                <span className="text-white text-sm mb-1">Your Suggestion</span>
                <div className="border-b-2 border-white hover:border-[#1DB954] transition-colors duration-300">
                  <textarea
                    name="suggestion"
                    value={form.suggestion}
                    onChange={handleChange}
                    placeholder="Describe your suggestion or the issue you're experiencing..."
                    className="bg-transparent py-2 px-4 placeholder:text-zinc-500 text-white outline-none text-sm w-full h-16 resize-none"
                  />
                </div>
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-transparent py-2 px-6 rounded-full outline-none w-fit text-white font-medium
                  hover:bg-[#1DB954] border-2 border-[#1DB954] hover:border-transparent transition-all duration-300 text-sm"
                >
                  {loading ? "Sending..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Earth Canvas - Right Half */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="w-1/2 h-full"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(FeedbackForm, "feedback");