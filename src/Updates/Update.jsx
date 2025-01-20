
//media query//delete card after time //when no word match a ui for that//improve the form //writring contenet
//improve the icons //auth laga do isme

//improve the uiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii

//media query//delete card after time //when no word match a ui for that//improve the form //writring contenet
//improve the icons //auth laga doisme

//media query//delete card after time //when no word match a ui for that//improve the form //writring contenet
//improve the icons //auth laga do for studuent and amdin later

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaBell, FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import moment from "moment";
//media query//delete card after time //when no word match a ui for that//improve the form //writring contenet
//improve the icons //auth laga doisme

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

  const isAdmin = true; // Hardcoded for now

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
    return text.replace(regex, `<span style="background-color: #ccffcc;">$1</span>`);
  };
  
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-zinc-900 text-zinc-200 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-primary">
        Updates
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search updates..."
          className="w-full max-w-2xl p-3 bg-zinc-800 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Updates List */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {filteredUpdates.length > 0 ? (
          filteredUpdates.map((update) => {
            const active = isActive(update.date);
            const daysAgo = moment().diff(moment(update.createdAt), "days");

            return (
              <motion.div
                key={update._id}
                className={`p-5 rounded-lg shadow-lg flex flex-col gap-4 ${
                  active
                    ? "bg-zinc-800 hover:shadow-xl hover:scale-105 hover:shadow-green-500 cursor-pointer"
                    : "bg-zinc-700 opacity-70 filter grayscale"
                }`}
                onClick={() => {
                  if (active && update.link) window.open(update.link, "_blank");
                }}
                variants={cardVariants}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaBell
                      className={`text-2xl ${
                        active ? "text-green-500" : "text-red-500"
                      }`}
                    />
                    <h2
                      className="text-2xl font-bold"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(update.title, searchQuery),
                      }}
                    />
                  </div>
                  {active ? (
  <span className="text-green-500 font-bold">Active ✅</span>
) : (
  <span className="text-red-500 font-bold">Inactive ❌</span>
)}
                </div>
                <p
                  className="text-sm mt-2"
                  dangerouslySetInnerHTML={{
                    __html: highlightText(update.description, searchQuery),
                  }}
                />
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
                  <FaCalendarAlt />
                  <span>{moment(update.date).format("MMMM D, YYYY")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaCalendarAlt />
                  <span>
                    Created {daysAgo} {daysAgo === 1 ? "day" : "days"} ago (
                    {moment(update.createdAt).format("MMMM D, YYYY")})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
  <FaUser />
  <span
    dangerouslySetInnerHTML={{
      __html: highlightText(update.createdBy, searchQuery),
    }}
  />
</div>

                {isAdmin && (
                  <div className="flex justify-end mt-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(update._id);
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          <motion.div
            className="flex flex-col items-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src="/dog-sad.png"
              alt="No Updates Found"
              className="w-64 h-64"
            />
            <p className="text-2xl font-semibold mt-4 text-zinc-300">
              No Updates Found
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Admin Form */}
      {isAdmin && (
        <motion.div
          className="mt-12 max-w-xl mx-auto p-6 bg-zinc-800 rounded-lg shadow-md"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-2xl font-semibold mb-6">Add a New Update</h2>
          <form
            onSubmit={handleCreate}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="p-3 bg-zinc-700 rounded-lg text-zinc-200"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-3 bg-zinc-700 rounded-lg text-zinc-200"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-3 bg-zinc-700 rounded-lg text-zinc-200"
            />
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              placeholder="Created By"
              className="p-3 bg-zinc-700 rounded-lg text-zinc-200"
            />
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Optional Link"
              className="p-3 bg-zinc-700 rounded-lg text-zinc-200"
            />
            {isFormValid && (
              <motion.button
                type="submit"
                className="bg-primary text-zinc-900 px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                Add Update
              </motion.button>
            )}
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default UpdateSection;
