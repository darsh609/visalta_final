import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTag, FaFileImage, FaPhoneAlt, FaRupeeSign, FaMapMarkerAlt, FaBoxOpen, FaCommentDots, FaPaperPlane } from "react-icons/fa";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText";


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const UploadItemForm = ({ userName }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    address: "",
    price: "",
    contact: "",
    thumbnail: null,
    tags: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === "file" ? files[0] : value,
    };
    setFormData(updatedFormData);
    validateForm(updatedFormData);
  };

  const validateForm = (data) => {
    const isValid =
      data.courseName &&
      data.courseDescription &&
      data.address &&
      data.price &&
      data.contact &&
      data.thumbnail &&
      data.tags;
    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form Data: ", formData);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Data Uploaded Successfully!");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col justify-center items-center p-4">

      

      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold text-gray-100 tracking-wide mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
         
          
<SplitText
  text=" Empower Through Sharing"
  className="text-2xl font-semibold text-center"
  delay={100}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>
        </h1>
        <p className="text-gray-400 italic text-2xl" style={{ fontFamily: "'Roboto', sans-serif" }}>
          Unlock possibilities by sharing your resources with peers.
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-2xl bg-gray-950 p-10 rounded-lg shadow-xl backdrop-blur-md transform transition-transform hover:scale-105"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Roboto Slab', serif" }}>Hi {userName},</h1>
        <form onSubmit={handleSubmit}>
          {[
            {
              name: "courseName",
              placeholder: "Item Name",
              icon: <FaBoxOpen className="mr-4 text-gray-400" />,
              type: "text",
              value: formData.courseName,
            },
            {
              name: "courseDescription",
              placeholder: "Description",
              icon: <FaCommentDots className="mr-4 text-gray-400" />,
              type: "textarea",
              value: formData.courseDescription,
            },
            {
              name: "address",
              placeholder: "Address (Hostel Name & Number)",
              icon: <FaMapMarkerAlt className="mr-4 text-gray-400" />,
              type: "text",
              value: formData.address,
            },
            {
              name: "price",
              placeholder: "Price (₹)",
              icon: <FaRupeeSign className="mr-4 text-gray-400" />,
              type: "number",
              value: formData.price,
            },
            {
              name: "contact",
              placeholder: "Contact Number",
              icon: <FaPhoneAlt className="mr-4 text-gray-400" />,
              type: "tel",
              value: formData.contact,
            },
          ].map((field, index) => (
            <motion.div
              key={index}
              className="mb-6 flex items-center text-xl hover:scale-105 transition-transform"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileFocus={{ scale: 1.1 }}
            >
              {field.icon}
              {field.type === "textarea" ? (
                <motion.textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-700 py-3 focus:outline-none focus:border-orange-500 focus:shadow-orange-400 focus:shadow-md"
                  whileFocus={{ borderColor: "#FFA500" }}
                ></motion.textarea>
              ) : (
                <motion.input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-700 py-3 focus:outline-none focus:border-orange-500 focus:shadow-orange-400 focus:shadow-md"
                  whileFocus={{ borderColor: "#FFA500" }}
                />
              )}
            </motion.div>
          ))}

          <motion.div
            className="mb-6 flex items-center text-xl hover:scale-105 transition-transform"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <FaFileImage className="mr-4 text-gray-400" />
            <div className="relative w-full">
              <motion.input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
                required
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              <motion.div
                className="py-3 px-6 bg-gray-800 text-gray-300 rounded-md border border-gray-700 hover:scale-105 transition-transform"
              >
                {formData.thumbnail ? formData.thumbnail.name : "Choose Image File"}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="mb-6 flex items-center text-xl hover:scale-105 transition-transform"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <FaTag className="mr-4 text-gray-400" />
            <motion.input
              type="text"
              name="tags"
              placeholder="Tags (Comma Separated)"
              value={formData.tags}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-700 py-3 focus:outline-none focus:border-orange-500 focus:shadow-orange-400 focus:shadow-md"
              whileFocus={{ borderColor: "#FFA500" }}
            />
          </motion.div>
        </form>
      </motion.div>

      {isFormValid && (
        <motion.button
          onClick={handleSubmit}
          className="fixed py-6 px-20 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-full shadow-xl flex items-center justify-center transform transition-transform hover:scale-125 right-16 bottom-16 text-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.15, backgroundColor: "#FF7043" }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ?
 "Sharing..." : <><FaPaperPlane className="mr-4" /> Share Now</>}
        </motion.button>
      )}

      {/* Media Queries */}
      <style jsx>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
          p {
            font-size: 1rem;
          }
          .text-xl {
            font-size: 1rem;
          }
          .py-6 {
            padding: 1.5rem;
          }
          .px-20 {
            padding-left: 2rem;
            padding-right: 2rem;
          }
          .text-3xl {
            font-size: 1.5rem;
          }
        }
      `}</style>


    </div>
  );
};

export default UploadItemForm;
