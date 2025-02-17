import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPhoneAlt, FaEnvelope, FaCopy } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import { FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';

const CourseCard = ({ course, onRemove }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(true);
  const { user } = useSelector((state) => state.profile);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));

      // API request to delete the course
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/course/deleteCourse`,
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Remove from UI
      onRemove();

      toast.success("Product removed successfully!", {
        style: {
          background: "#4B5563",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Failed to delete course:", error);
      toast.error("Failed to delete course.", {
        style: {
          background: "#4B5563",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMilliseconds = now - created;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    return `${diffInDays} days ago`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 relative hover:-translate-y-2"
    >
      {/* Image Container */}
      <motion.div 
        className="relative aspect-[4/3]"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={course.thumbnail} 
          alt={course.courseName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
      </motion.div>

      {/* Title and Delete Button Container */}
      <div className="p-2 flex justify-between items-center">
        {/* Title */}
        <h3 className="px-3 text-2xl font-bold text-white font-poppins">
          {course.courseName}
        </h3>

        {/* Delete Button */}
        <motion.button   
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}            
          onClick={() => setShowModal(true)}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-red-500 hover:text-red-400"
        >
          <FiTrash2 size={22} />
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-2">
        {/* Description */}
        <div className="font-poppins">
          <span className="text-white font-semibold">Description: </span>
          <span className="text-white">
            {isDescriptionExpanded ? course.courseDescription : 
            `${course.courseDescription.slice(0, 10)}${course.courseDescription.length > 10 ? '...' : ''}`}
            {course.courseDescription.length > 10 && (
              <motion.button 
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="ml-2 text-[#49DE80] font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isDescriptionExpanded ? 'Show less' : 'Read more'}
              </motion.button>
            )}
          </span>
        </div>

        {/* Price */}
        <div className="font-poppins">
          <span className="text-white font-semibold">Price: </span>
          <span className="text-[#49DE80] font-bold text-lg">
            ₹{course.price.toLocaleString()}
          </span>
        </div>

        <div className="text-sm text-gray-500 font-poppins">
          {calculateTimeDifference(course.createdAt)}
        </div>

        {/* Expandable content */}
        {showMoreInfo && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 border-t border-[#49DE80] space-y-4"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {course.tag?.map((tag, index) => (
                <motion.span 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 text-sm rounded-full bg-[#49DE80]/10 text-[#49DE80] font-poppins font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Main content area */}
            <div className="flex justify-between items-start gap-6">
              {/* Information */}
              <div className="space-y-3 flex-1 font-poppins">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="text-white font-semibold"
                >
                  {course.instructor.firstName} {course.instructor.lastName}
                </motion.div>

                <div className="text-white">
                  {course.address}
                </div>

                <div>
                  <span className="text-white font-semibold">Interests: </span>
                  <span className="text-[#49DE80] font-bold">{course.studentsEnrolled.length}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex flex-col items-end space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCopyToClipboard(course.contact)} 
                  className="bg-zinc-800/30 text-center w-40 rounded-xl h-12 relative text-white/80 font-poppins font-semibold group"
                >
                  <motion.div 
                    className="bg-[#49DE80] rounded-xl h-8 w-1/5 flex items-center justify-center absolute left-1 top-1 group-hover:w-[124px] z-10 transition-all duration-300"
                    transition={{ duration: 0.3 }}
                  >
                    <IoCopyOutline className="text-white" />
                  </motion.div>
                  <p className="translate-x-1 text-sm">WhatsApp</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCopyToClipboard(course.instructor.email)}
                  className="bg-zinc-800/30 text-center w-32 rounded-xl h-12 relative text-white/80 font-poppins font-semibold group"
                >
                  <motion.div 
                    className="bg-[#49DE80] rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 top-1 group-hover:w-[94px] z-10 transition-all duration-300"
                    transition={{ duration: 0.3 }}
                  >
                    <IoCopyOutline className="text-white" />
                  </motion.div>
                  <p className="translate-x-1 text-sm">Email</p>
                </motion.button>
              </div> */}
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-80">
            <h2 className="text-lg font-semibold mb-4 font-poppins">Confirm Delete</h2>
            <p className="mb-6 font-poppins">
              Are you sure you want to delete the course <strong>{course.courseName}</strong>?
            </p>
            <div className="flex justify-end space-x-4 font-poppins">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#49DE80] rounded hover:bg-[#3fc26f]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Mycourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));

        // GET request to fetch courses
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/course/mycourses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setCourses(response.data.data || []); 
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        toast.error("Failed to load courses.", {
          style: {
            background: "#4B5563",
            color: "white",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleRemove = (courseId) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
  };

  return (
    <div className="container max-w-full p-12 bg-zinc-900 min-h-full">
     
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        My Products
        <span className="block text-lg font-normal text-zinc-400 mt-2">
          Manage your listed products and see how they're performing
        </span>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen animate-pulse">
          Loading...
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard 
              key={course._id} 
              course={course} 
              onRemove={() => handleRemove(course._id)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 animate-fade-in">
          No products found. Start selling by listing your products.
        </div>
      )}
    </div>
  );
};

export default Mycourse;