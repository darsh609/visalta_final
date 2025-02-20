import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWhatsapp} from 'react-icons/fa';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import emailjs from 'emailjs-com'
import { useSelector } from 'react-redux';
import { IoCopyOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { motion } from 'framer-motion';
import { FiFilter, FiTrash2 } from "react-icons/fi";
import { set } from 'react-hook-form';
import moment from "moment";
import sorry from "../assets/sorry.png";

const Input = ({ placeholder, value, onChange, className }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border rounded p-2 ${className}`}
  />
);

const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
  >
    {children}
  </button>
);
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
const CourseCard = ({ course, searchTerm, onDelete, deleteCourse, setShowModal, setCourseToDelete }) => {
  const { user } = useSelector((state) => state.profile);
  console.log("user",user)
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(
    course.studentsEnrolled?.includes(user?._id)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(true);

   // Function to truncate description by words
   const truncateByWords = (text, limit = 12) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };


  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy'));
  };

  const openWhatsApp = (e) => {
    // Prevent the click from triggering any parent onClick handlers
    e.stopPropagation();
  
    // Construct the message with user and product details.
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
    // URL-encode the message so that spaces and special characters are properly formatted.
    const encodedMessage = encodeURIComponent(message);
  
    // Build the WhatsApp URL (make sure course.contact is in international format without '+' or '00')
    const whatsappUrl = `https://wa.me/${course.contact}?text=${encodedMessage}`;
  
    // Open WhatsApp in a new tab/window.
    window.open(whatsappUrl, '_blank');
  };
  
  const htmlMessage = `
    <div style="background-color: #1a1a1a; color: #fff; font-family: Arial, sans-serif; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://iili.io/2yOho5Q.jpg" alt="Visalta Logo" style="max-width: 150px;">
      </div>
      <h2 style="color: #a8d5ba;">Hello!</h2>
      <p>
        I'm <strong>${user?.firstName}</strong> from <strong>${user?.additionalDetails?.hostel}</strong>. I discovered your listing on <strong>Visalta</strong> and I'm very interested in your second-hand product.
      </p>
      <h3 style="color: #a8d5ba;">Product Details:</h3>
      <p>
        <strong>Name:</strong> ${course?.courseName}<br>
        <strong>Price:</strong> ₹${course?.price?.toLocaleString()}
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <img src="${course?.thumbnail}" alt="${course?.courseName}" style="max-width: 300px; border: 2px solid #a8d5ba; border-radius: 8px;">
      </div>
      <p><strong>Contact Number:</strong> ${user?.additionalDetails.contactNumber}</p>
       <p><strong>Contact Email:</strong> ${user?.email}</p>
      <p>I have a few questions:</p>
      <ol>
        <li>Is the product still available?</li>
        <li>Can you share details about its condition and functionality?</li>
        <li>Is there any possibility of a discount?</li>
      </ol>
      <p>Looking forward to your reply.</p>
      <p>Best regards,<br><strong>${user?.firstName}</strong></p>
      <p style="font-style: italic; margin-top: 20px;">This email was sent by the VISALTA team.</p>
    </div>
  `;
    const subject = `Inquiry: Request for More Details about ${course?.courseName} from Visalta`;
  
  
  const sendEmail = () => {
    // Build the template parameters for the product owner's email
    const templateParams = {
      subject, // Fills in the {{subject}} placeholder
      from_name: user?.firstName,
      from_hostel: user?.additionalDetails.hostel,
      product_name: course?.courseName,
      product_price: `₹${course?.price.toLocaleString()}`,
      to_name: course?.instructor.firstName,
      message: htmlMessage, // The HTML email body for the owner
      to_email: course?.instructor.email
    };
  
    // Replace with your actual EmailJS IDs
    const serviceID = 'service_s7b9s1v';
    const templateID = 'template_fkv8gud';
    const userID = 'NnYBFTHd9piExxQjw';
  
    // Build a response email for the user that is a copy of the owner's email
    // with an additional header informing them that their inquiry has been forwarded.
    const ssubject = "Inquiry Received – Seller Will Contact You Shortly!";
  
  const responseHtmlMessage = `
    <div style="background-color: #1a1a1a; color: #fff; font-family: Arial, sans-serif; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
      
      </div>
      <h2 style="color: #a8d5ba;">Inquiry Confirmed!</h2>
      <p>
        Hi ${user.firstName},<br><br>
        We’ve successfully forwarded your inquiry regarding <strong>${course.courseName}</strong> to the seller.
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
      message: responseHtmlMessage, // This is the modified copy including the header
      to_email: user.email
    };
  
    // Assume the response email uses a second template ID from EmailJS:
    
  
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

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
      <mark key={index} className="bg-yellow-200 text-black">{part}</mark> : part
    );
  };

  const handleSaveToggle = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const url = `${process.env.REACT_APP_BASE_URL}/course/${
        isSaved ? "dislike" : "dolike"
      }`;

      await axios.post(
        url,
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsSaved(!isSaved);
      toast.success(isSaved ? "Product removed from saved items" : "Product added to saved items!", {
        style: {
          background: "#4B5563",
          color: "white",
        },
        icon: isSaved ? "❌" : "📚",
      });
    } catch (error) {
      console.error("Error saving/unsaving course:", error);
      toast.error("Failed to toggle save state!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className=" group bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 relative hover:-translate-y-2"
  >

    {/* Image Container */}
    <motion.div 
      className="relative aspect-[4/3]"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={course?.thumbnail} 
        alt={course?.courseName}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
    </motion.div>

     {/* Title */}
      {/* Title and Buttons Container */}
      <div className="p-2 flex justify-between items-center">
        {/* Title */}
        <h3 className="px-3 text-2xl font-bold text-white font-poppins">
          {highlightText(course?.courseName, searchTerm)}
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
            onClick={handleSaveToggle}
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
            ) : isSaved ? (
              <FaBookmark className="text-[#49DE80]" size={20} />
            ) : (
              <FaRegBookmark size={20} />
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
           `${course?.courseDescription.slice(0, 10)}${course?.courseDescription.length > 10 ? '...' : ''}`}
          {course?.courseDescription.length > 10 && (
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
          ₹{highlightText(course.price.toLocaleString(), searchTerm)}
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
                {highlightText(`${course.instructor.firstName} ${course.instructor.lastName}`, searchTerm)}
              </motion.div>

              <div className="text-white">
                {highlightText(course.address, searchTerm)}
              </div>

              <div>
                <span className="text-white font-semibold">Interests: </span>
                <span className="text-[#49DE80] font-bold">{course.studentsEnrolled.length}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-end space-y-">
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

    {/* Admin Delete Button */}
    {user?.accountType === 'Admin' && (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setShowModal(true);
          setCourseToDelete(course);
        }}
        className="absolute bottom-4 right-4 flex items-center justify-center  text-red-500 hover:text-red-400 transition-colors"
      >
        <FiTrash2 className="w-5 h-5" />
      </motion.button>
    )}

    {/* Top right corner buttons */}
    <div className="absolute flex items-center gap-2 top-[42%] right-4">
          
      <EmailConfirmationModal
        show={showEmailModal}
        onCancel={() => setShowEmailModal(false)}
        onConfirm={handleConfirmEmail}
      />
    </div>
  </motion.div> );
};

const BuyPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [hostelFilter, setHostelFilter] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const { user } = useSelector((state) => state.profile);
  const userHostel = user?.additionalDetails?.hostel;

  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/course/deleteCourse`, {
        courseId: courseId,
      });

      if (response.data.success) {
        toast.success('Course deleted successfully');
        setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
        setFilteredCourses((prevFiltered) => prevFiltered.filter(course => course._id !== courseId));
      } else {
        throw new Error(response.data.message || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error(error.message || 'Failed to delete course');
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/course/getAllCourses`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const coursesData = response.data?.courses || 
                  response.data?.data || 
                  (Array.isArray(response.data) ? response.data : []);

        const reversedCoursesData = [...coursesData].reverse();
        
        setCourses(reversedCoursesData);
        setFilteredCourses(reversedCoursesData);
        setError(null);
      } catch (error) {
        console.error('Error fetching courses', error);
        setError(error.message);
        setCourses([]);
        setFilteredCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = courses.filter(course => 
      ['courseName', 'courseDescription', 'instructor.firstName', 'instructor.lastName', 'address', 'price', 'tag']
        .some(field => {
          const value = field.split('.').reduce((obj, key) => obj?.[key], course);
          return String(value).toLowerCase().includes(term);
        })
    );

    setFilteredCourses(filtered);
  };

  const handleSort = () => {
    if(sortOrder==='asc'){
      const sorted = [...filteredCourses].sort((a, b) => 
      a.price - b.price
      );
      setFilteredCourses(sorted);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

    }
    else{
      if(hostelFilter){
        // const sorted = [...filteredCourses].sort((a, b) => 
        // new Date(b.createdAt) - new Date(a.createdAt)
        // );
        // setFilteredCourses(sorted);
        // setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');'
        const hostelFilteredCourses = courses.filter(
          course => course.address.toLowerCase().includes(userHostel.toLowerCase())
        );
        setFilteredCourses(hostelFilteredCourses);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      }
      else{
        setFilteredCourses(courses)
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

      }

      

    }
  
   
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    let filtered = courses;

    if (type === 'latest') {
      filtered = courses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (type === 'hostel' && userHostel) {
      filtered = courses.filter(
        course => course.address.toLowerCase().includes(userHostel.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
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

  const handleHostelFilter = () => {
    setHostelFilter(!hostelFilter);

    if (!hostelFilter && userHostel) {
      const hostelFilteredCourses = courses.filter(
        course => course.address.toLowerCase().includes(userHostel.toLowerCase())
      );
      setFilteredCourses(hostelFilteredCourses);
    } else {
      setFilteredCourses(courses);
    }
  };

  return (
    <div className="container max-w-full p-12 bg-zinc-900 min-h-screen ">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
      Instant Connections for Every Find
          <span className="block text-lg font-normal text-zinc-400 mt-2">From textbooks to gadgets, search with ease and reach out to sellers in just a click.
          </span>
        </h1>

      <div className="flex flex-wrap gap-4 items-center mb-8 max-w-4xl mx-auto relative">
        <Input 
          placeholder="Search Products" 
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow bg-zinc-800 text-white border-black/10 focus:border-black"
        />
        <div className="flex space-x-4">
        <Button 
            onClick={handleSort}
            className="text-white bg-zinc-900 hover:bg-[#49DE80] transition flex gap-2"
          >
            <FiFilter className="w-5 h-5"/>
           {sortOrder === 'asc' ? 'Price' : 'date added'}
          </Button>
          {userHostel && (
            <Button 
              onClick={handleHostelFilter}
              className={`transition ${
                hostelFilter 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-zinc-700 hover:bg-zinc-600'
              }`}
            >
              {hostelFilter ? 'My Hostel Items' : 'Filter by My Hostel'}
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen animate-pulse">
          Loading...
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-10">
          Error: {error}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center text-gray-400 animate-fade-in">
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
      Product Not Available
      </p>
    </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCourses.map(course => (
            <CourseCard 
              key={course._id}
              course={course}
              searchTerm={searchTerm}
              deleteCourse={deleteCourse}
              setShowModal={setShowModal}
              setCourseToDelete={setCourseToDelete}
            />
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-80">
            <h2 className="text-lg font-semibold mb-4 font-poppins">Confirm Delete</h2>
            <p className="mb-6 font-poppins">
              Are you sure you want to delete the course <strong>{courseToDelete?.courseName}</strong>?
            </p>
            <div className="flex justify-end space-x-4 font-poppins">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#49DE80] rounded hover:bg-[#3fc26f]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteCourse(courseToDelete._id);
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPage;
