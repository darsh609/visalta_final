import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { IoCopyOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import emailjs from 'emailjs-com';

const EmailConfirmationModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      {/* Modal Content */}
      <div className="bg-zinc-900 text-white p-6 rounded shadow-lg z-10 max-w-xs w-full">
        <h3 className="text-xl font-semibold text-center mb-4">Confirm Inquiry</h3>
        <p className="text-center mb-6">
          Are you sure you want to send your inquiry for additional details to the product owner?
        </p>
        <div className="flex justify-around">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded"
          >
            Yes, Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course, onRemove }) => {
  const { user } = useSelector((state) => state.profile);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(true); // Initially saved because this is the liked courses page
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(true);

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy'));
  };

  const openWhatsApp = (e) => {
    e.stopPropagation();
  
    const message = `Hello! 
  
I'm ${user.firstName} from ${user.additionalDetails.hostel}. I discovered your listing on Visalta and I'm very interested in your product.
  
Product Details:
• Name: ${course.courseName}
• Price: ₹${course.price.toLocaleString()}
  
I have a few questions:
1. Is the product still available?
2. Can you share details about its condition and functionality?
3. Is there any possibility of a discount?
  
Looking forward to your reply.
  
Best regards,
${user.firstName}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${course.contact}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const htmlMessage = `
    <div style="background-color: #1a1a1a; color: #fff; font-family: Arial, sans-serif; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://i.postimg.cc/25V8F6Nh/Visalta.jpg" alt="Visalta Logo" style="max-width: 150px;">
      </div>
      <h2 style="color: #a8d5ba;">Hello!</h2>
      <p>
        I'm <strong>${user.firstName}</strong> from <strong>${user.additionalDetails.hostel}</strong>. I discovered your listing on <strong>Visalta</strong> and I'm very interested in your second-hand product.
      </p>
      <h3 style="color: #a8d5ba;">Product Details:</h3>
      <p>
        <strong>Name:</strong> ${course.courseName}<br>
        <strong>Price:</strong> ₹${course.price.toLocaleString()}
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <img src="${course.thumbnail}" alt="${course.courseName}" style="max-width: 300px; border: 2px solid #a8d5ba; border-radius: 8px;">
      </div>
      <p><strong>Contact Number:</strong> ${user.additionalDetails.contactNumber}</p>
      <p><strong>Contact Email:</strong> ${user.email}</p>
      <p>I have a few questions:</p>
      <ol>
        <li>Is the product still available?</li>
        <li>Can you share details about its condition and functionality?</li>
        <li>Is there any possibility of a discount?</li>
      </ol>
      <p>Looking forward to your reply.</p>
      <p>Best regards,<br><strong>${user.firstName}</strong></p>
      <p style="font-style: italic; margin-top: 20px;">This email was sent by the VISALTA team.</p>
    </div>
  `;
  const subject = `Inquiry: Request for More Details about ${course.courseName} from Visalta`;
  
  const sendEmail = () => {
    // Build the template parameters for the product owner's email
    const templateParams = {
      subject,
      from_name: user.firstName,
      from_hostel: user.additionalDetails.hostel,
      product_name: course.courseName,
      product_price: `₹${course.price.toLocaleString()}`,
      to_name: course.instructor.firstName,
      message: htmlMessage,
      to_email: course.instructor.email
    };
  
    // Replace with your actual EmailJS IDs
    const serviceID = 'service_s7b9s1v';
    const templateID = 'template_fkv8gud';
    const userID = 'NnYBFTHd9piExxQjw';
  
    const ssubject = "Inquiry Received – Seller Will Contact You Shortly!";
  
    const responseHtmlMessage = `
      <div style="background-color: #1a1a1a; color: #fff; font-family: Arial, sans-serif; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
        
        </div>
        <h2 style="color: #a8d5ba;">Inquiry Confirmed!</h2>
        <p>
          Hi ${user.firstName},<br><br>
          We've successfully forwarded your inquiry regarding <strong>${course.courseName}</strong> to the seller.
          Expect to hear from them soon – they will be in touch with you directly.
        </p>
        <p>
          Below is a copy of the message we sent for your reference:
        </p>
        <hr style="border: 1px solid #a8d5ba; margin: 20px 0;">
        ${htmlMessage}
        <p style="margin-top: 20px; font-style: italic;">
          Thank you for choosing Visalta -Navigating Student's Life!
        </p>
      </div>
    `;
  
    // Define the template parameters for the response email to the user
    const responseTemplateParams = {
      subject: `${ssubject}`,
      from_name: 'VISALTA Team',
      to_name: user.firstName,
      message: responseHtmlMessage,
      to_email: user.email
    };
  
    // Send the inquiry email to the product owner first
    toast.promise(
      emailjs.send(serviceID, templateID, templateParams, userID),
      {
        pending: 'Sending inquiry...',
        success: 'Inquiry sent successfully!',
        error: 'Failed to send inquiry.'
      }
    )
    .then(() => {
      // After successful sending, send the confirmation email to the user
      emailjs.send(serviceID, templateID, responseTemplateParams, userID)
        .then((response) => {
          console.log('Response email sent!', response.status, response.text);
          setShowEmailModal(false);
        })
        .catch((err) => {
          console.error('Error sending response email: ', err);
          setShowEmailModal(false);
        });
    })
    .catch((err) => {
      console.error('Error sending inquiry email: ', err);
    });
  };
  
  const openEmailModal = (e) => {
    e.stopPropagation();
    setShowEmailModal(true);
  };
  
  // Handler when user confirms sending the email
  const handleConfirmEmail = (e) => {
    e.stopPropagation();
    sendEmail();
    setShowEmailModal(false);
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

  // Combined dislike functionality with the UI of the BuyPage's save toggle
  const handleDislike = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));

      // API request to dislike the course
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/course/dislike`,
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Remove from localStorage
      const savedCourses = JSON.parse(localStorage.getItem("savedCourses") || "[]");
      const updatedSavedCourses = savedCourses.filter((id) => id !== course._id);
      localStorage.setItem("savedCourses", JSON.stringify(updatedSavedCourses));

      // Remove from UI
      onRemove();

      toast.success("Product removed from saved items", {
        style: {
          background: "#4B5563",
          color: "white",
        },
        icon: "❌",
      });
    } catch (error) {
      console.error("Failed to dislike course:", error);
      toast.error("Failed to remove from saved items", {
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

      {/* Title and Buttons Container */}
      <div className="p-2 flex justify-between items-center">
        {/* Title */}
        <h3 className="px-3 text-2xl font-bold text-white font-poppins">
          {course.courseName}
        </h3>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button   
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}            
            onClick={(e) => {
              e.stopPropagation();
              openWhatsApp(e);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#F1F8E8] hover:text-[#49DE80]"
          >
            <FaWhatsapp size={25} />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openEmailModal}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#F1F8E8] hover:text-[#49DE80]"
          >
            <MdMailOutline size={25} />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDislike}
            disabled={isLoading}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#F1F8E8] hover:text-[#49DE80]"
          >
            {isLoading ? (
              <div className="animate-spin">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <FaBookmark className="text-[#49DE80]" size={20} />
            )}
          </motion.button>
        </div>
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
                  {`${course.instructor.firstName} ${course.instructor.lastName}`}
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
              <div className="flex flex-col items-end space-y-2">
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
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-zinc-900 p-6 rounded-lg shadow-lg text-white">
            <p className="mb-4">Are you sure you want to remove this product from your saved items?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDislike}
                className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
                disabled={isLoading}
              >
                {isLoading ? "Removing..." : "Yes"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <EmailConfirmationModal
        show={showEmailModal}
        onCancel={() => setShowEmailModal(false)}
        onConfirm={handleConfirmEmail}
      />
    </motion.div>
  );
};

const Likecourse = () => {
  const [likedCourses, setLikedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedCourses = async () => {
      try {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/course/getalllike`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", response);
        setLikedCourses(response.data.likedCourses);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch liked courses:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedCourses();
  }, []);

  const handleRemoveFromList = (courseId) => {
    setLikedCourses((prev) => prev.filter((course) => course._id !== courseId));
  };

  return (
    <div className="container max-w-full p-12 bg-zinc-900 min-h-screen">
      {/* Page Heading */}
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Saved Products
        <span className="block text-lg font-normal text-zinc-400 mt-2">
          Items you've bookmarked for future reference or consideration
        </span>
      </motion.h1>

      {/* Courses List */}
      {loading ? (
        <div className="flex justify-center items-center h-64 animate-pulse">
          <p className="text-center text-gray-400">Loading saved products...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-10">
          Error: {error}
        </div>
      ) : likedCourses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {likedCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onRemove={() => handleRemoveFromList(course._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-center text-gray-400 mb-4">No saved products found.</p>
          <p className="text-center text-gray-500">Browse products and bookmark your favorites to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default Likecourse;