import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaUser, FaBell, FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import sorry from "../assets/sorry.png";
import SpotlightCard from "./SpotlightCard";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/updates";

const UpdateSection = () => {
  const [updates, setUpdates] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    createdBy: "",
    link: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useSelector((state) => state.profile);
  console.log("---->",user)
  const isAdmin = user?.accountType === "Admin"; // Hardcoded for now

  // Fetch updates from the backend
  const fetchUpdates = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getupdate`);

      setUpdates(response.data);
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  // Determine Active or Inactive Status
  const isActive = (date) => moment(date).isAfter(moment());

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Create Update
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/createupdate`, formData);
      setFormData({
        title: "",
        description: "",
        date: "",
        createdBy: "",
        link: "",
      });
      fetchUpdates(); // Refresh updates
    } catch (error) {
      console.error("Error creating update:", error);
    }
  };

  // Handle Delete Update
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/deleteupdate`, { data: { id } });
      fetchUpdates(); // Refresh updates
    } catch (error) {
      console.error("Error deleting update:", error);
    }
  };

  // Check if all required fields are filled
  const isFormValid =
    formData.title.trim() &&
    formData.description.trim() &&
    formData.date.trim() &&
    formData.createdBy.trim();

  // Filter Updates
  const filteredUpdates = updates.filter(
    (update) =>
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Highlight Matched Text
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<span className="bg-green-200 text-green-800">$1</span>`);
  };
  
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  const noResultVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };
  return (
    <div className="bg-zinc-900 text-zinc-200 min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary font-founders uppercase tracking-tight">
        Timely Alerts And Posts 🚀
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search updates..."
            className="w-full max-w-2xl p-3 bg-zinc-800 rounded-lg text-zinc-200 focus:outline-none  focus:ring-primary"
          />
        </div>

        {/* Updates List */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredUpdates.length > 0 ? (
              filteredUpdates.map((update) => {
                const active = isActive(update.date);
                const daysAgo = moment().diff(moment(update.createdAt), "days");

                return (
                  <div onClick={() => {
                    if (active && update.link) window.open(update.link, "_blank");
                  }}>
                    <SpotlightCard
                    key={update._id}
                    className={`p-6 rounded-xl shadow-lg transform transition-all duration-300 ${
                      active&&update.link!=""
                        ? "cursor-pointer"
                        : "" 
                        
                    }       ${active?"bg-zinc-800 hover:shadow-green-500/50":"bg-zinc-700 opacity-70  hover:shadow-red-500/50 cursor-not-allowed"}`}
                    variants={cardVariants}
                    whileHover="hover"
                    onClick={() => {
                      if (active && update.link) window.open(update.link, "_blank");
                    }}
                  >
                    <div className="flex items-center justify-between mb-4 " >
                      <div className="flex items-center gap-3">
                        <FaBell
                          className={`text-2xl ${
                            active ? "text-green-500" : "text-red-500"
                          }`}
                        />
                        <h2
                          className="text-xl font-bold"
                          dangerouslySetInnerHTML={{
                            __html: highlightText(update.title, searchQuery),
                          }}
                        />
                      </div>
                      <span 
                        className={`font-bold text-sm ${
                          active ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p
                      className="text-sm mb-4 text-zinc-300"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(update.description, searchQuery),
                      }}
                    />

                    <div className="space-y-2 text-sm text-zinc-400 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>{moment(update.date).format("MMMM D, YYYY")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>
                          Created {daysAgo} {daysAgo === 1 ? "day" : "days"} ago
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUser />
                        <span
                          className="font-bold text-green-400"
                          dangerouslySetInnerHTML={{
                            __html: highlightText(update.createdBy, searchQuery),
                          }}
                        />
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="flex justify-end">
                        <motion.button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(update._id);
                          }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrashAlt />
                        </motion.button>
                      </div>
                    )}
                  </SpotlightCard>
                  </div>
                  
                );
              })
            ) : (
              <motion.div
                className="col-span-full flex flex-col items-center justify-center"
                variants={noResultVariants}
              >
                <img
                  src={sorry}
                  alt="No Updates Found"
                  className="w-64 h-64 mb-4 opacity-70"
                />
                <p className="text-2xl font-semibold text-zinc-300">
                  No Updates Found
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Admin Form */}
        {isAdmin && (
          <motion.div
            className="mt-12 max-w-xl mx-auto p-8 bg-zinc-800 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
              Add a New Update
            </h2>
            <form
              onSubmit={handleCreate}
              className="space-y-4"
            >
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-3 bg-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 bg-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="p-3 bg-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  placeholder="Created By"
                  className="p-3 bg-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Optional Link"
                className="w-full p-3 bg-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {isFormValid && (
                <motion.button
                  type="submit"
                  className="w-full bg-primary text-zinc-900 px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Update
                </motion.button>
              )}
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UpdateSection;