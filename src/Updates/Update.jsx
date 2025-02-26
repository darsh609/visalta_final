import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {  FaUser} from "react-icons/fa";
import moment from "moment";
import sorry from "../assets/sorry.png";
import SpotlightCard from "./SpotlightCard";
import { useSelector } from "react-redux";
import { AlertCircle, Bell, Check, Save, Edit2, LogIn, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaGlobe,FaSeedling, FaBolt, FaRegBuilding, FaUsers, FaHandshake, FaBell, FaCalendarAlt, FaTag, FaUserCircle, FaTrashAlt } from 'react-icons/fa';
const BASE_URL = process.env.REACT_APP_BASE_URL + "/updates";

const NotificationPreferences = ({ token, navigate }) => {

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { user } = useSelector((state) => state.profile)

  const categories = [
    { id: "flash alerts", name: "Flash Alerts", icon: <AlertCircle size={16} /> },
    { id: "official", name: "Official", icon: <Bell size={16} /> },
    { id: "clubs", name: "Clubs", icon: <Bell size={16} /> },
    { id: "spring-spree", name: "Spring-Spree", icon: <Bell size={16} /> },
    { id: "societies", name: "Societies", icon: <Bell size={16} /> },
    { id: "other", name: "Other", icon: <Bell size={16} /> }
  ];
  useEffect(() => {
    if (token && user?._id) {
      fetch(`${process.env.REACT_APP_BASE_URL }/notifications?userId=${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.notificationPreference) {
            // Update the state with saved categories
            setSelectedCategories(data.notificationPreference.categories);
          }
        })
        .catch((err) => console.error("Error fetching preferences:", err));
    }
  }, [token, user]);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/notifications`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({
          userId: user._id,
          email: user.email,
          categories: selectedCategories
        })
      });

      const data = await response.json();
      if (response.ok) {
        setIsEditing(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        console.error("Error updating notification preferences", data);
      }
    } catch (error) {
      console.error("Error updating notification preferences", error);
    }
  };

  
  if (!token) {
    return (
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white p-4 rounded-xl w-full max-w-4xl mx-auto shadow-lg border border-zinc-700">
        <div className="flex items-center space-x-3 mb-3">
          <Bell className="text-green-500" size={20} />
          <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
          Select Categories to Receive Email Updates
          </h2>
        </div>
        
        <div className="bg-zinc-800/50 p-3 rounded-lg mb-3 border border-zinc-700/50">
          <p className="text-zinc-300 text-sm">
            Select Categories to Receive Email Updates
          </p>
        </div>
        
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium shadow-md hover:shadow-lg"
        >
          <LogIn size={16} />
          <span>Login to Continue</span>
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white p-4 rounded-xl w-full max-w-4xl mx-auto shadow-lg border border-zinc-700 relative">
      {showToast && (
        <div className="absolute top-2 left-0 right-0 mx-auto w-11/12 bg-green-600 text-white py-2 px-3 rounded-lg shadow-lg flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Check size={16} className="mr-2" />
            <span>Your selected categories have been saved. We'll email you notifications for these categories!</span>
          </div>
          <button onClick={() => setShowToast(false)} className="text-white">
            <X size={14} />
          </button>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Bell className="text-green-500" size={18} />
          <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
          Select Categories to Receive Email Updates
          </h2>
        </div>
        
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-full transition-colors duration-200"
            title="Save preferences"
          >
            <Save size={16} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-zinc-700 hover:bg-zinc-600 text-white p-1.5 rounded-full transition-colors duration-200"
            title="Edit preferences"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-3">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => isEditing && handleSelectCategory(category.id)}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedCategories.includes(category.id) 
                ? 'bg-green-600/20 border border-green-500/30' 
                : 'bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-700/30'
            } ${!isEditing && 'pointer-events-none opacity-80'}`}
          >
            <div className="flex items-center space-x-2">
              {category.icon}
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            
            {selectedCategories.includes(category.id) && (
              <div className="bg-green-500 rounded-full p-0.5">
                <Check size={14} />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!isEditing && selectedCategories.length > 0 && (
        <div className="bg-zinc-800/50 p-2 rounded-lg border border-zinc-700/50 text-zinc-300 text-xs">
          <p>You'll receive email notifications for: {selectedCategories.map(id => 
            categories.find(cat => cat.id === id)?.name
          ).join(", ")}.</p>
        </div>
      )}
      
      {isEditing && (
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium shadow-md hover:shadow-lg mt-3"
        >
          <Save size={16} />
          <span>Save Preferences</span>
        </button>
      )}
    </div>
  );
};
const UpdateSection = () => {
  const MAX_WORDS =50;
  const MAX_TITLE_WORDS = 10;
  const [updates, setUpdates] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    createdBy: "",
    link: "",
    category:""
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

  
  const isActive = date => moment().isSameOrBefore(moment(date), 'day');


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      const words = value.trim().split(/\s+/);
      if (words.length >= 10) return;
    }
    
    // Check word count for Product Description
    if (name === 'description') {
      const words = value.trim().split(/\s+/);
      if (words.length >= 50) return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleCreate = async (e) => {
    e.preventDefault();
  

    try {
      await toast.promise(
        axios.post(`${BASE_URL}/createupdate`, formData),
        {
          loading: "Adding TAPs..",
          success: "TAPs Added Successfully!",
          error: (err) =>
            `Error creating update: ${
              err.response?.data?.message || err.message
            }`,
        }
      );
  
      setFormData({
        title: "",
        description: "",
        date: "",
        createdBy: "",
        link: "",
        category: "",
      });
      fetchUpdates(); // Refresh updates
    } catch (error) {
      console.error("Error creating update:", error);
      // No need for additional toast.error here as toast.promise handles errors.
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
    formData.createdBy.trim()&&
    formData.category.trim();

  // Filter Updates
  // const filteredUpdates = updates.filter(
  //   (update) =>
  //     update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     update.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     update.createdBy.toLowerCase().includes(searchQuery.toLowerCase())||
  //     update.category.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const filteredUpdates = updates.filter((update) => {
    const matchesSearch =
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.category.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesCategory = true;
    if (selectedCategory !== "ALL") {
      // For "Clubs" and "Societies", perform substring matching
      if (selectedCategory === "Clubs") {
        matchesCategory = update?.category?.toLowerCase().includes("clubs");
      } else if (selectedCategory === "Societies") {
        matchesCategory = update?.category?.toLowerCase().includes("societies");
      } else {
        matchesCategory =
          update?.category?.toLowerCase() === selectedCategory.toLowerCase();
      }
    }
    return matchesSearch && matchesCategory;
  });
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



  // // Filter updates based on selected category.
  //  filteredUpdates = updates.filter((update) => {
  //   if (selectedCategory === "ALL") return true;
  //   return update.category === selectedCategory;
  // });
  const categories = [
    { id: 'ALL', icon: FaGlobe, label: 'ALL' },
    { id: 'Spring-Spree', icon: FaSeedling, label: 'Spring-Spree' },
   
    { id: 'Flash alerts', icon: FaBolt, label: 'Flash alerts' },
    { id: 'Official', icon: FaRegBuilding, label: 'Official' },
    { id: 'Clubs', icon: FaUsers, label: 'Clubs' },
    { id: 'Societies', icon: FaHandshake, label: 'Societies' },
    { id: 'Other', icon: FaHandshake, label: 'Other' },
   
  ];


  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  

  return (
    <div className="bg-zinc-900 text-zinc-200 min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary font-founders uppercase tracking-tight">
        Timely Alerts And Posts 🚀
        </h1>
        <div className="mb-8">
        <NotificationPreferences token={token} navigate={navigate}/>
        </div>
        



       <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-4 md:mb-8 px-2 md:px-4">

     
      {categories.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setSelectedCategory(id)}
          className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full border text-xs md:text-base transition-all duration-200 ${
            selectedCategory === id 
              ? "bg-primary text-white border-primary" 
              : "bg-zinc-700 text-zinc-300 border-zinc-600 hover:bg-zinc-600"
          }`}
        >
          <Icon className="w-3 h-3 md:w-4 md:h-4" />
          <span className="whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
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
        <div
          onClick={() => {
            if (active && update.link) window.open(update.link, "_blank");
          }}
          key={update._id} // moved key here for proper list rendering
        >
          <SpotlightCard
            className={`p-6 rounded-xl shadow-lg transform transition-all duration-300 ${
              active && update.link !== ""
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-70"
            } ${active ? "bg-zinc-800 hover:shadow-green-500/50" : "bg-zinc-700 hover:shadow-red-500/50"}`}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => {
              if (active && update.link) window.open(update.link, "_blank");
            }}
          >
            <div className="flex items-center justify-between mb-4">
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
                <FaTag />
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(update.category, searchQuery),
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <FaUserCircle />
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
        No TAPs Found
      </p>
    </motion.div>
  )}
</motion.div>

        </AnimatePresence>
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
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-3 bg-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <small className="text-zinc-400">
                {formData.title.split(/\s+/).filter((word) => word !== "").length}{" "}
                / {MAX_TITLE_WORDS} words
              </small>
            </div>

            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 bg-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
              <small className="text-zinc-400">
                {
                  formData.description
                    .split(/\s+/)
                    .filter((word) => word !== "").length
                }{" "}
                / {MAX_WORDS} words
              </small>
            </div>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Category</option>
              <option value="Flash alerts">Flash alerts</option>
              <option value="Official">Official</option>
              <option value="Clubs">Clubs</option>
              <option value="Spring-Spree">Spring-Spree</option>
              <option value="Societies">Societies</option>
              <option value="other">Other</option>
            </select>

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
        </motion.div>)}

      </div>
    </div>
  );
};

export default UpdateSection;