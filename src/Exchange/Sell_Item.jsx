// // // // import React, { useState } from "react";
// // // // import axios from "axios";
// // // // import { motion } from "framer-motion";
// // // // import { FaTag, FaTimes,FaFileImage, FaPhoneAlt, FaRupeeSign, FaMapMarkerAlt, FaBoxOpen, FaCommentDots, FaPaperPlane } from "react-icons/fa";
// // // // import SplitText from "../blocks/TextAnimations/SplitText/SplitText";

// // // // const handleAnimationComplete = () => {
// // // //   console.log('All letters have animated!');
// // // // };
// // // // const UploadItemForm = ({ userName }) => {
// // // //   const [formData, setFormData] = useState({
// // // //     courseName: "",
// // // //     courseDescription: "",
// // // //     address: "",
// // // //     price: "",
// // // //     contact: "",
// // // //     thumbnailImage: null,
// // // //     tags: [],
// // // //   });
// // // //   const [currentTag, setCurrentTag] = useState("");
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // //   const [error, setError] = useState("");
// // // //   const [isFormValid, setIsFormValid] = useState(false);

// // // //   const handleChange = (e) => {
// // // //     const { name, value, type, files } = e.target;
// // // //     const updatedFormData = {
// // // //       ...formData,
// // // //       [name]: type === "file" ? files[0] : value,
// // // //     };
// // // //     setFormData(updatedFormData);
// // // //     validateForm(updatedFormData);
// // // //   };

// // // //   const addTag = (e) => {
// // // //     if (e.key === 'Enter' || e.type === 'click') {
// // // //       e.preventDefault();
// // // //       const trimmedTag = currentTag.trim();
// // // //       if (trimmedTag && !formData.tags.includes(trimmedTag)) {
// // // //         setFormData(prevState => ({
// // // //           ...prevState,
// // // //           tags: [...prevState.tags, trimmedTag]
// // // //         }));
// // // //         setCurrentTag("");
// // // //       }
// // // //     }
// // // //   };

// // // //   const removeTag = (tagToRemove) => {
// // // //     setFormData(prevState => ({
// // // //       ...prevState,
// // // //       tags: prevState.tags.filter(tag => tag !== tagToRemove)
// // // //     }));
// // // //   };



// // // //   const validateForm = () => {
// // // //     return !!(
// // // //       formData.courseName &&
// // // //       formData.courseDescription &&
// // // //       formData.address &&
// // // //       formData.price &&
// // // //       formData.contact &&
// // // //       formData.thumbnailImage &&
// // // //       formData.tags.length > 0
// // // //     );
// // // //   };
// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!validateForm()) return;

// // // //     setIsSubmitting(true);
// // // //     setError("");

// // // //     const formDataToSubmit = new FormData();
// // // //     Object.keys(formData).forEach(key => {
// // // //       if (key === 'tags') {
// // // //         formData.tags.forEach((tag, index) => {
// // // //           formDataToSubmit.append(`tag[${index}]`, tag);
// // // //         });
// // // //       } else {
// // // //         formDataToSubmit.append(key, formData[key]);
// // // //       }
// // // //     });

// // // //     try {
// // // //       const token = localStorage.getItem('token');
      
// // // //       const response = await axios.post(
// // // //         `${process.env.REACT_APP_BASE_URL}/course/createcourse`, 
// // // //         formDataToSubmit,
// // // //         {
// // // //           headers: {
// // // //             'Content-Type': 'multipart/form-data',
// // // //             'Authorization': `Bearer ${token}`
// // // //           }
// // // //         }
// // // //       );

// // // //       alert("Item Created Successfully!");
// // // //       // Reset form
// // // //       setFormData({
// // // //         courseName: "",
// // // //         courseDescription: "",
// // // //         address: "",
// // // //         price: "",
// // // //         contact: "",
// // // //         thumbnailImage: null,
// // // //         tags: [],
// // // //       });
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || "Failed to create item");
// // // //       alert(error);
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };
// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col justify-center items-center p-4">

      

// // // //       <motion.div
// // // //         className="mb-6 text-center"
// // // //         initial={{ opacity: 0, y: -20 }}
// // // //         animate={{ opacity: 1, y: 0 }}
// // // //         transition={{ duration: 1 }}
// // // //       >
// // // //         <h1 className="text-6xl font-bold text-gray-100 tracking-wide mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
         
          
// // // // <SplitText
// // // //   text=" Empower Through Sharing"
// // // //   className="text-2xl font-semibold text-center"
// // // //   delay={100}
// // // //   animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
// // // //   animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
// // // //   easing="easeOutCubic"
// // // //   threshold={0.2}
// // // //   rootMargin="-50px"
// // // //   onLetterAnimationComplete={handleAnimationComplete}
// // // // />
// // // //         </h1>
// // // //         <p className="text-gray-400 italic text-2xl" style={{ fontFamily: "'Roboto', sans-serif" }}>
// // // //           Unlock possibilities by sharing your resources with peers.
// // // //         </p>
// // // //       </motion.div>

// // // //       <motion.div
// // // //         className="w-full max-w-2xl bg-gray-950 p-10 rounded-lg shadow-xl backdrop-blur-md transform transition-transform hover:scale-105"
// // // //         initial={{ scale: 0.9, opacity: 0 }}
// // // //         animate={{ scale: 1, opacity: 1 }}
// // // //         transition={{ duration: 1, ease: "easeInOut" }}
// // // //       >
// // // //         <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Roboto Slab', serif" }}>Hi {userName},</h1>
// // // //         <form onSubmit={handleSubmit}>
// // // //           {[
// // // //             {
// // // //               name: "courseName",
// // // //               placeholder: "Item Name",
// // // //               icon: <FaBoxOpen className="mr-4 text-gray-400" />,
// // // //               type: "text",
// // // //               value: formData.courseName,
// // // //             },
// // // //             {
// // // //               name: "courseDescription",
// // // //               placeholder: "Description",
// // // //               icon: <FaCommentDots className="mr-4 text-gray-400" />,
// // // //               type: "textarea",
// // // //               value: formData.courseDescription,
// // // //             },
// // // //             {
// // // //               name: "address",
// // // //               placeholder: "Address (Hostel Name & Number)",
// // // //               icon: <FaMapMarkerAlt className="mr-4 text-gray-400" />,
// // // //               type: "text",
// // // //               value: formData.address,
// // // //             },
// // // //             {
// // // //               name: "price",
// // // //               placeholder: "Price (₹)",
// // // //               icon: <FaRupeeSign className="mr-4 text-gray-400" />,
// // // //               type: "number",
// // // //               value: formData.price,
// // // //             },
// // // //             {
// // // //               name: "contact",
// // // //               placeholder: "Contact Number",
// // // //               icon: <FaPhoneAlt className="mr-4 text-gray-400" />,
// // // //               type: "tel",
// // // //               value: formData.contact,
// // // //             },
// // // //           ].map((field, index) => (
// // // //             <motion.div
// // // //               key={index}
// // // //               className="mb-6 flex items-center text-xl hover:scale-105 transition-transform"
// // // //               initial={{ opacity: 0, x: -50 }}
// // // //               animate={{ opacity: 1, x: 0 }}
// // // //               transition={{ duration: 0.5, delay: index * 0.2 }}
// // // //               whileFocus={{ scale: 1.1 }}
// // // //             >
// // // //               {field.icon}
// // // //               {field.type === "textarea" ? (
// // // //                 <motion.textarea
// // // //                   name={field.name}
// // // //                   placeholder={field.placeholder}
// // // //                   value={field.value}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   className="w-full bg-transparent border-b border-gray-700 py-3 focus:outline-none focus:border-orange-500 focus:shadow-orange-400 focus:shadow-md"
// // // //                   whileFocus={{ borderColor: "#FFA500" }}
// // // //                 ></motion.textarea>
// // // //               ) : (
// // // //                 <motion.input
// // // //                   type={field.type}
// // // //                   name={field.name}
// // // //                   placeholder={field.placeholder}
// // // //                   value={field.value}
// // // //                   onChange={handleChange}
// // // //                   required
// // // //                   className="w-full bg-transparent border-b border-gray-700 py-3 focus:outline-none focus:border-orange-500 focus:shadow-orange-400 focus:shadow-md"
// // // //                   whileFocus={{ borderColor: "#FFA500" }}
// // // //                 />
// // // //               )}
// // // //             </motion.div>
// // // //           ))}

// // // //           <motion.div
// // // //             className="mb-6 flex items-center text-xl hover:scale-105 transition-transform"
// // // //             initial={{ opacity: 0, x: -50 }}
// // // //             animate={{ opacity: 1, x: 0 }}
// // // //             transition={{ duration: 0.5, delay: 1 }}
// // // //           >
// // // //             <FaFileImage className="mr-4 text-gray-400" />
// // // //             <div className="relative w-full">
// // // //               <motion.input
// // // //                 type="file"
// // // //                 name="thumbnail"
// // // //                 accept="image/*"
// // // //                 onChange={handleChange}
// // // //                 required
// // // //                 className="absolute inset-0 w-full opacity-0 cursor-pointer"
// // // //               />
// // // //               <motion.div
// // // //                 className="py-3 px-6 bg-gray-800 text-gray-300 rounded-md border border-gray-700 hover:scale-105 transition-transform"
// // // //               >
// // // //                 {formData.thumbnail ? formData.thumbnail.name : "Choose Image File"}
// // // //               </motion.div>
// // // //             </div>
// // // //           </motion.div>
// // // //           <motion.div
// // // //         className="w-full max-w-2xl bg-gray-950 p-10 rounded-lg"
// // // //         initial={{ opacity: 0, y: 20 }}
// // // //         animate={{ opacity: 1, y: 0 }}
// // // //       >
// // // //         <div className="flex items-center mb-4">
// // // //           <FaTag className="mr-4 text-gray-400" />
// // // //           <input
// // // //             type="text"
// // // //             value={currentTag}
// // // //             onChange={(e) => setCurrentTag(e.target.value)}
// // // //             onKeyDown={addTag}
// // // //             placeholder="Add tags (Press Enter)"
// // // //             className="w-full bg-transparent border-b border-gray-700 py-3 focus:outline-none focus:border-orange-500"
// // // //           />
// // // //           <button 
// // // //             onClick={addTag}
// // // //             className="ml-2 bg-orange-500 text-white px-3 py-2 rounded"
// // // //           >
// // // //             Add
// // // //           </button>
// // // //         </div>

// // // //         {/* Tags Display */}
// // // //         <div className="flex flex-wrap gap-2 mb-4">
// // // //           {formData.tags.map((tag) => (
// // // //             <motion.div
// // // //               key={tag}
// // // //               className="flex items-center bg-gray-800 px-3 py-1 rounded-full"
// // // //               initial={{ scale: 0 }}
// // // //               animate={{ scale: 1 }}
// // // //             >
// // // //               <span className="mr-2">{tag}</span>
// // // //               <button onClick={() => removeTag(tag)}>
// // // //                 <FaTimes className="text-red-400" />
// // // //               </button>
// // // //             </motion.div>
// // // //           ))}
// // // //         </div>
// // // //       </motion.div>
// // // //         </form>
// // // //       </motion.div>

// // // //       <motion.button
// // // //         onClick={handleSubmit}
// // // //         // disabled={!validateForm()}
// // // //         className={`fixed py-6 px-20 ${true ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-600 cursor-not-allowed'} text-white font-bold rounded-full shadow-xl flex items-center justify-center transform transition-transform right-16 bottom-16 text-3xl`}
// // // //         initial={{ opacity: 0, scale: 0.8 }}
// // // //         animate={{ opacity: 1, scale: 1 }}
// // // //         whileHover={{ scale: 1.15 }}
// // // //         whileTap={{ scale: 0.95 }}
// // // //       >
// // // //         {isSubmitting ? "Sharing..." : <><FaPaperPlane className="mr-4" /> Share Now</>}
// // // //       </motion.button>

// // // //       {/* Media Queries */}
// // // //       <style jsx>{`
// // // //         @media (max-width: 768px) {
// // // //           h1 {
// // // //             font-size: 2rem;
// // // //           }
// // // //           p {
// // // //             font-size: 1rem;
// // // //           }
// // // //           .text-xl {
// // // //             font-size: 1rem;
// // // //           }
// // // //           .py-6 {
// // // //             padding: 1.5rem;
// // // //           }
// // // //           .px-20 {
// // // //             padding-left: 2rem;
// // // //             padding-right: 2rem;
// // // //           }
// // // //           .text-3xl {
// // // //             font-size: 1.5rem;
// // // //           }
// // // //         }
// // // //       `}</style>


// // // //     </div>
// // // //   );
// // // // };

// // // // export default UploadItemForm;


// // // // import React, { useState } from 'react';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { Toaster, toast } from 'react-hot-toast';
// // // // import axios from 'axios';

// // // // const UploadItemForm = () => {
  
// // // //   const [formData, setFormData] = useState({
// // // //     courseName: '',
// // // //     courseDescription: '',
// // // //     address: '',
// // // //     price: '',
// // // //     tag: [],
// // // //     contact: '',
// // // //     thumbnailImage: null
// // // //   });

// // // //   const [currentTag, setCurrentTag] = useState('');
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // // //   const handleInputChange = (e) => {
// // // //     const { name, value, files } = e.target;
    
// // // //     if (name === 'thumbnailImage' && files) {
// // // //       setFormData(prev => ({
// // // //         ...prev,
// // // //         thumbnailImage: files[0]
// // // //       }));
// // // //     } else {
// // // //       setFormData(prev => ({
// // // //         ...prev,
// // // //         [name]: value
// // // //       }));
// // // //     }
// // // //   };

// // // //   const addTag = () => {
// // // //     if (currentTag && !formData.tag.includes(currentTag)) {
// // // //       setFormData(prev => ({
// // // //         ...prev,
// // // //         tag: [...prev.tag, currentTag]
// // // //       }));
// // // //       setCurrentTag('');
// // // //     }
// // // //   };

// // // //   const removeTag = (tagToRemove) => {
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       tag: prev.tag.filter(tag => tag !== tagToRemove)
// // // //     }));
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
    
// // // //     // Validate form
// // // //     const requiredFields = [
// // // //       'courseName', 'courseDescription', 'address', 
// // // //       'price', 'tag', 'contact', 'thumbnailImage'
// // // //     ];
    
// // // //     const missingFields = requiredFields.filter(field => 
// // // //       !formData[field] || (field === 'tag' && formData[field].length === 0)
// // // //     );

// // // //     if (missingFields.length > 0) {
// // // //       toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
// // // //       return;
// // // //     }

// // // //     setIsSubmitting(true);

// // // //     const formSubmitData = new FormData();
// // // //     Object.keys(formData).forEach(key => {
// // // //       if (key === 'tag') {
// // // //         formData[key].forEach((tag, index) => {
// // // //           formSubmitData.append(`tag[${index}]`, tag);
// // // //         });
// // // //       } else {
// // // //         formSubmitData.append(key, formData[key]);
// // // //       }
// // // //     });

// // // //     try {
// // // //       const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
// // // //       console.log('Form Data:', formSubmitData,"---------------------->",token);
// // // //       const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/course/createCourse`, formSubmitData, {
// // // //         headers: {
// // // //           'Content-Type': 'multipart/form-data',
// // // //           'Authorization': `Bearer ${token}`
// // // //         }
// // // //       });

// // // //       console.log("--->",response)
// // // //       toast.success('Course Created Successfully');
     
// // // //       console.log('Course Creation Response:', response.data);
      
// // // //       // Reset form after successful submission
// // // //       setFormData({
// // // //         courseName: '',
// // // //         courseDescription: '',
// // // //         address: '',
// // // //         price: '',
// // // //         tag: [],
// // // //         contact: '',
// // // //         thumbnailImage: null
// // // //       });
// // // //     } catch (error) {
// // // //       toast.error('Failed to create course');
// // // //       console.error('Course Creation Error:', error);
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };

// // // //   const isFormValid = () => {
// // // //     const requiredFields = [
// // // //       'courseName', 'courseDescription', 'address', 
// // // //       'price', 'tag', 'contact', 'thumbnailImage'
// // // //     ];
// // // //     return requiredFields.every(field => 
// // // //       field === 'tag' 
// // // //         ? formData[field] && formData[field].length > 0
// // // //         : formData[field]
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
// // // //       <Toaster richColors />
// // // //       <motion.div 
// // // //         initial={{ opacity: 0, scale: 0.9 }}
// // // //         animate={{ opacity: 1, scale: 1 }}
// // // //         transition={{ duration: 0.5 }}
// // // //         className="w-full max-w-md bg-zinc-800 rounded-xl shadow-2xl p-6"
// // // //       >
// // // //         <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Course</h2>
        
// // // //         <form onSubmit={handleSubmit} className="space-y-4">
// // // //           <input 
// // // //             type="text"
// // // //             name="courseName"
// // // //             placeholder="Course Name"
// // // //             value={formData.courseName}
// // // //             onChange={handleInputChange}
// // // //             className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //           />
          
// // // //           <textarea 
// // // //             name="courseDescription"
// // // //             placeholder="Course Description"
// // // //             value={formData.courseDescription}
// // // //             onChange={handleInputChange}
// // // //             className="w-full p-3 bg-zinc-700 text-white rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //           />
          
// // // //           <input 
// // // //             type="text"
// // // //             name="address"
// // // //             placeholder="Address"
// // // //             value={formData.address}
// // // //             onChange={handleInputChange}
// // // //             className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //           />
          
// // // //           <div className="flex space-x-2">
// // // //             <input 
// // // //               type="number"
// // // //               name="price"
// // // //               placeholder="Price"
// // // //               value={formData.price}
// // // //               onChange={handleInputChange}
// // // //               className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //             />
            
// // // //             <input 
// // // //               type="text"
// // // //               name="contact"
// // // //               placeholder="Contact"
// // // //               value={formData.contact}
// // // //               onChange={handleInputChange}
// // // //               className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //             />
// // // //           </div>
          
// // // //           <div className="flex space-x-2">
// // // //             <input 
// // // //               type="text"
// // // //               value={currentTag}
// // // //               onChange={(e) => setCurrentTag(e.target.value)}
// // // //               placeholder="Add Tags"
// // // //               className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //             />
// // // //             <button 
// // // //               type="button"
// // // //               onClick={addTag}
// // // //               className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
// // // //             >
// // // //               Add
// // // //             </button>
// // // //           </div>

// // // //           <AnimatePresence>
// // // //             {formData.tag.length > 0 && (
// // // //               <motion.div 
// // // //                 initial={{ opacity: 0, height: 0 }}
// // // //                 animate={{ opacity: 1, height: 'auto' }}
// // // //                 exit={{ opacity: 0, height: 0 }}
// // // //                 className="flex flex-wrap gap-2 mt-2"
// // // //               >
// // // //                 {formData.tag.map(tag => (
// // // //                   <motion.span
// // // //                     key={tag}
// // // //                     initial={{ scale: 0 }}
// // // //                     animate={{ scale: 1 }}
// // // //                     exit={{ scale: 0 }}
// // // //                     className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center space-x-2"
// // // //                   >
// // // //                     <span>{tag}</span>
// // // //                     <button 
// // // //                       type="button"
// // // //                       onClick={() => removeTag(tag)}
// // // //                       className="text-sm"
// // // //                     >
// // // //                       ×
// // // //                     </button>
// // // //                   </motion.span>
// // // //                 ))}
// // // //               </motion.div>
// // // //             )}
// // // //           </AnimatePresence>
          
// // // //           <input 
// // // //             type="file"
// // // //             name="thumbnailImage"
// // // //             onChange={handleInputChange}
// // // //             className="w-full p-3 bg-zinc-700 text-white rounded-lg file:mr-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white file:px-4 file:py-2"
// // // //           />

// // // //           <AnimatePresence>
// // // //             {isFormValid() && (
// // // //               <motion.button
// // // //                 initial={{ opacity: 0, scale: 0.9 }}
// // // //                 animate={{ opacity: 1, scale: 1 }}
// // // //                 exit={{ opacity: 0, scale: 0.9 }}
// // // //                 type="submit"
// // // //                 disabled={isSubmitting}
// // // //                 className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
// // // //               >
// // // //                 {isSubmitting ? 'Creating...' : 'Create Course'}
// // // //               </motion.button>
// // // //             )}
// // // //           </AnimatePresence>
// // // //         </form>
// // // //       </motion.div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UploadItemForm;


// // // import React, { useState } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Toaster, toast } from 'react-hot-toast';
// // // import axios from 'axios';

// // // const UploadItemForm = () => {
// // //   const [formData, setFormData] = useState({
// // //     courseName: '',
// // //     courseDescription: '',
// // //     address: '',
// // //     price: '',
// // //     tag: [],
// // //     contact: '',
// // //     thumbnailImage: null
// // //   });

// // //   const [currentTag, setCurrentTag] = useState('');
// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   const handleInputChange = (e) => {
// // //     const { name, value, files } = e.target;
    
// // //     if (name === 'thumbnailImage' && files) {
// // //       console.log('File selected:', files[0]); // Debug log
// // //       setFormData(prev => ({
// // //         ...prev,
// // //         thumbnailImage: files[0]
// // //       }));
// // //     } else {
// // //       setFormData(prev => ({
// // //         ...prev,
// // //         [name]: value
// // //       }));
// // //     }
// // //   };

// // //   const addTag = () => {
// // //     if (currentTag && !formData.tag.includes(currentTag)) {
// // //       setFormData(prev => ({
// // //         ...prev,
// // //         tag: [...prev.tag, currentTag]
// // //       }));
// // //       setCurrentTag('');
// // //     }
// // //   };

// // //   const removeTag = (tagToRemove) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       tag: prev.tag.filter(tag => tag !== tagToRemove)
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     // Log full form data before submission
// // //     console.log('Full Form Data Before Submission:', {
// // //       ...formData,
// // //       tag: formData.tag,
// // //       thumbnailImage: formData.thumbnailImage ? formData.thumbnailImage.name : null
// // //     });

// // //     const requiredFields = [
// // //       'courseName', 'courseDescription', 'address', 
// // //       'price', 'tag', 'contact', 'thumbnailImage'
// // //     ];
    
// // //     const missingFields = requiredFields.filter(field => 
// // //       !formData[field] || (field === 'tag' && formData[field].length === 0)
// // //     );

// // //     if (missingFields.length > 0) {
// // //       toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
// // //       return;
// // //     }

// // //     setIsSubmitting(true);

// // //     const formSubmitData = new FormData();
// // //     Object.keys(formData).forEach(key => {
// // //       if (key === 'tag') {
// // //         formData[key].forEach((tag, index) => {
// // //           formSubmitData.append(`tag[${index}]`, tag);
// // //         });
// // //       } else if (key === 'thumbnailImage' && formData[key]) {
// // //         formSubmitData.append(key, formData[key]);
// // //       } else if (formData[key] !== null && formData[key] !== undefined) {
// // //         formSubmitData.append(key, formData[key]);
// // //       }
// // //     });

// // //     // Log FormData contents
// // //     for (let [key, value] of formSubmitData.entries()) {
// // //       console.log(`FormData - ${key}:`, value);
// // //     }

// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       console.log('Token:', token);

// // //       const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/course/createCourse`, formSubmitData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data',
// // //           'Authorization': `Bearer ${token}`
// // //         }
// // //       });

// // //       toast.success('Course Created Successfully');
// // //       console.log('Course Creation Response:', response.data);
      
// // //       // Reset form after successful submission
// // //       setFormData({
// // //         courseName: '',
// // //         courseDescription: '',
// // //         address: '',
// // //         price: '',
// // //         tag: [],
// // //         contact: '',
// // //         thumbnailImage: null
// // //       });
// // //     } catch (error) {
// // //       toast.error('Failed to create course');
// // //       console.error('Course Creation Error:', error.response ? error.response.data : error.message);
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   const isFormValid = () => {
// // //     const requiredFields = [
// // //       'courseName', 'courseDescription', 'address', 
// // //       'price', 'tag', 'contact', 'thumbnailImage'
// // //     ];
// // //     return requiredFields.every(field => 
// // //       field === 'tag' 
// // //         ? formData[field] && formData[field].length > 0
// // //         : formData[field]
// // //     );
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
// // //       <Toaster />
// // //       <motion.div 
// // //         initial={{ opacity: 0, scale: 0.9 }}
// // //         animate={{ opacity: 1, scale: 1 }}
// // //         transition={{ duration: 0.5 }}
// // //         className="w-full max-w-md bg-zinc-800 rounded-xl shadow-2xl p-6"
// // //       >
// // //         <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Course</h2>
        
// // //         <form onSubmit={handleSubmit} className="space-y-4">
// // //           <input 
// // //             type="text"
// // //             name="courseName"
// // //             placeholder="Course Name"
// // //             value={formData.courseName}
// // //             onChange={handleInputChange}
// // //             className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //           />
          
// // //           <textarea 
// // //             name="courseDescription"
// // //             placeholder="Course Description"
// // //             value={formData.courseDescription}
// // //             onChange={handleInputChange}
// // //             className="w-full p-3 bg-zinc-700 text-white rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //           />
          
// // //           <input 
// // //             type="text"
// // //             name="address"
// // //             placeholder="Address"
// // //             value={formData.address}
// // //             onChange={handleInputChange}
// // //             className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //           />
          
// // //           <div className="flex space-x-2">
// // //             <input 
// // //               type="number"
// // //               name="price"
// // //               placeholder="Price"
// // //               value={formData.price}
// // //               onChange={handleInputChange}
// // //               className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //             />
            
// // //             <input 
// // //               type="text"
// // //               name="contact"
// // //               placeholder="Contact"
// // //               value={formData.contact}
// // //               onChange={handleInputChange}
// // //               className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //             />
// // //           </div>
          
// // //           <div className="flex space-x-2">
// // //             <input 
// // //               type="text"
// // //               value={currentTag}
// // //               onChange={(e) => setCurrentTag(e.target.value)}
// // //               placeholder="Add Tags"
// // //               className="w-full p-3 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //             />
// // //             <button 
// // //               type="button"
// // //               onClick={addTag}
// // //               className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
// // //             >
// // //               Add
// // //             </button>
// // //           </div>

// // //           <AnimatePresence>
// // //             {formData.tag.length > 0 && (
// // //               <motion.div 
// // //                 initial={{ opacity: 0, height: 0 }}
// // //                 animate={{ opacity: 1, height: 'auto' }}
// // //                 exit={{ opacity: 0, height: 0 }}
// // //                 className="flex flex-wrap gap-2 mt-2"
// // //               >
// // //                 {formData.tag.map(tag => (
// // //                   <motion.span
// // //                     key={tag}
// // //                     initial={{ scale: 0 }}
// // //                     animate={{ scale: 1 }}
// // //                     exit={{ scale: 0 }}
// // //                     className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center space-x-2"
// // //                   >
// // //                     <span>{tag}</span>
// // //                     <button 
// // //                       type="button"
// // //                       onClick={() => removeTag(tag)}
// // //                       className="text-sm"
// // //                     >
// // //                       ×
// // //                     </button>
// // //                   </motion.span>
// // //                 ))}
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
          
// // //           <input 
// // //             type="file"
// // //             name="thumbnailImage"
// // //             onChange={handleInputChange}
// // //             className="w-full p-3 bg-zinc-700 text-white rounded-lg file:mr-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white file:px-4 file:py-2"
// // //           />

// // //           <AnimatePresence>
// // //             {isFormValid() && (
// // //               <motion.button
// // //                 initial={{ opacity: 0, scale: 0.9 }}
// // //                 animate={{ opacity: 1, scale: 1 }}
// // //                 exit={{ opacity: 0, scale: 0.9 }}
// // //                 type="submit"
// // //                 disabled={isSubmitting}
// // //                 className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
// // //               >
// // //                 {isSubmitting ? 'Creating...' : 'Create Course'}
// // //               </motion.button>
// // //             )}
// // //           </AnimatePresence>
// // //         </form>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default UploadItemForm;
// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import toast from "react-hot-toast";
// // import axios from "axios";

// // const UploadItemForm = () => {
// //   const [formData, setFormData] = useState({
// //     courseName: "",
// //     courseDescription: "",
// //     address: "",
// //     price: "",
// //     tag: [],
// //     contact: "",
// //     thumbnail: null,
// //   });
// //   const [tagInput, setTagInput] = useState("");
// //   const [isFormValid, setIsFormValid] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //     validateForm({ ...formData, [name]: value });
// //   };

// //   const handleFileChange = (e) => {
// //     setFormData({ ...formData, thumbnail: e.target.files[0] });
// //     validateForm({ ...formData, thumbnail: e.target.files[0] });
// //   };

// //   const handleAddTag = () => {
// //     if (tagInput.trim()) {
// //       setFormData({ ...formData, tag: [...formData.tag, tagInput.trim()] });
// //       setTagInput("");
// //     }
// //   };

// //   const validateForm = (data) => {
// //     const isValid =
// //       data.courseName &&
// //       data.courseDescription &&
// //       data.address &&
// //       data.price &&
// //       data.contact &&
// //       data.thumbnail;
// //     setIsFormValid(isValid);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const { courseName, courseDescription, address, price, tag, contact, thumbnail } = formData;
  
// //     const formDataToSend = new FormData();
// //     formDataToSend.append("courseName", courseName);
// //     formDataToSend.append("courseDescription", courseDescription);
// //     formDataToSend.append("address", address);
// //     formDataToSend.append("price", price);
// //     formDataToSend.append("contact", contact);
// //     tag.forEach((t) => formDataToSend.append("tag", t));
// //     formDataToSend.append("thumbnailImage", thumbnail);
  
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       toast.error("Authentication token is missing. Please log in again.");
// //       return;
// //     }
  
// //     try {
// //       console.log("Sending headers:", {
// //         Authorization: `Bearer ${token}`,
// //         "Content-Type": "multipart/form-data",
// //       });
  
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_BASE_URL}/course/createCourse`,
// //         formDataToSend,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );
  
// //       toast.success("Course created successfully!");
// //       console.log(response.data);
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Failed to create course.");
// //       console.error(error.response || error);
// //     }
// //   };
  

// //   return (
// //     <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
// //       <motion.form
// //         onSubmit={handleSubmit}
// //         initial={{ opacity: 0, y: 50 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
// //       >
// //         <h2 className="text-2xl font-bold text-white mb-4">Create Course</h2>

// //         <input
// //           type="text"
// //           name="courseName"
// //           placeholder="Course Name"
// //           value={formData.courseName}
// //           onChange={handleChange}
// //           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
// //         />

// //         <textarea
// //           name="courseDescription"
// //           placeholder="Course Description"
// //           value={formData.courseDescription}
// //           onChange={handleChange}
// //           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
// //         ></textarea>

// //         <input
// //           type="text"
// //           name="address"
// //           placeholder="Address"
// //           value={formData.address}
// //           onChange={handleChange}
// //           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
// //         />

// //         <input
// //           type="number"
// //           name="price"
// //           placeholder="Price"
// //           value={formData.price}
// //           onChange={handleChange}
// //           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
// //         />

// //         <div className="flex items-center mb-4">
// //           <input
// //             type="text"
// //             placeholder="Add a tag"
// //             value={tagInput}
// //             onChange={(e) => setTagInput(e.target.value)}
// //             className="w-full p-2 rounded bg-zinc-700 text-white"
// //           />
// //           <button
// //             type="button"
// //             onClick={handleAddTag}
// //             className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
// //           >
// //             Add
// //           </button>
// //         </div>

// //         <div className="mb-4">
// //           {formData.tag.map((t, index) => (
// //             <span
// //               key={index}
// //               className="inline-block bg-zinc-600 text-white px-2 py-1 rounded mr-2 mb-2"
// //             >
// //               {t}
// //             </span>
// //           ))}
// //         </div>

// //         <input
// //           type="text"
// //           name="contact"
// //           placeholder="Contact"
// //           value={formData.contact}
// //           onChange={handleChange}
// //           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
// //         />

// //         <input
// //           type="file"
// //           onChange={handleFileChange}
// //           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
// //         />

// //         {isFormValid && (
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             type="submit"
// //             className="w-full bg-green-500 text-white py-2 rounded mt-4"
// //           >
// //             Submit
// //           </motion.button>
// //         )}
// //       </motion.form>
// //     </div>
// //   );
// // };

// // export default UploadItemForm;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// const UploadItemForm = () => {
//   const [formData, setFormData] = useState({
//     courseName: "",
//     courseDescription: "",
//     address: "",
//     price: "",
//     tag: [],
//     contact: "",
//     thumbnail: null,
//   });
//   const [tagInput, setTagInput] = useState("");
//   const [isFormValid, setIsFormValid] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     validateForm({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, thumbnail: e.target.files[0] });
//     validateForm({ ...formData, thumbnail: e.target.files[0] });
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim()) {
//       setFormData({ ...formData, tag: [...formData.tag, tagInput.trim()] });
//       setTagInput("");
//     }
//   };

//   const validateForm = (data) => {
//     const isValid =
//       data.courseName &&
//       data.courseDescription &&
//       data.address &&
//       data.price &&
//       data.contact &&
//       data.thumbnail;
//     setIsFormValid(isValid);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { courseName, courseDescription, address, price, tag, contact, thumbnail } = formData;
  
//     const formDataToSend = new FormData();
//     formDataToSend.append("courseName", courseName);
//     formDataToSend.append("courseDescription", courseDescription);
//     formDataToSend.append("address", address);
//     formDataToSend.append("price", price);
//     formDataToSend.append("contact", contact);
  
//     // Ensure tags are sent correctly
//     tag.forEach((t, index) => {
//       formDataToSend.append(`tag[${index}]`, t);
//     });
  
//     // Ensure thumbnail is added
//     if (thumbnail) {
//       formDataToSend.append("thumbnailImage", thumbnail);
//     }
  
//     const token = JSON.parse(localStorage.getItem("token"));
    
//     console.log("Sending data:", Object.fromEntries(formDataToSend)); // Log form data
//     console.log("Token from localStorage:", token); // Log the token to verify it's correct
  
//     try {
//       const response = await fetch(`http://localhost:4000/api/v1/course/createCourse`, {
//         method: 'POST',
//         body: formDataToSend,
//         headers: {
//           'Authorization': `Bearer ${token}`, // Ensure the token is being sent correctly
//         },
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Full error response:', errorText);
//         throw new Error(errorText || "Failed to create course");
//       }
  
//       // Handle the success response
//       const result = await response.json();
//       console.log("Success Response:", result);
//       toast.success("Course created successfully!");
//     } catch (error) {
//       console.error('Detailed error:', error);
//       toast.error(error.message);
//     }
//   };
  

//   return (
//     <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
//       <motion.form
//         onSubmit={handleSubmit}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold text-white mb-4">Create Course</h2>

//         <input
//           type="text"
//           name="courseName"
//           placeholder="Course Name"
//           value={formData.courseName}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
//         />

//         <textarea
//           name="courseDescription"
//           placeholder="Course Description"
//           value={formData.courseDescription}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
//         ></textarea>

//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
//         />

//         <div className="flex items-center mb-4">
//           <input
//             type="text"
//             placeholder="Add a tag"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             className="w-full p-2 rounded bg-zinc-700 text-white"
//           />
//           <button
//             type="button"
//             onClick={handleAddTag}
//             className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>

//         <div className="mb-4">
//           {formData.tag.map((t, index) => (
//             <span
//               key={index}
//               className="inline-block bg-zinc-600 text-white px-2 py-1 rounded mr-2 mb-2"
//             >
//               {t}
//             </span>
//           ))}
//         </div>

//         <input
//           type="text"
//           name="contact"
//           placeholder="Contact"
//           value={formData.contact}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
//         />

//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
//         />

//         {isFormValid && (
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full bg-green-500 text-white py-2 rounded mt-4"
//           >
//             Submit
//           </motion.button>
//         )}
//       </motion.form>
//     </div>
//   );
// };

// export default UploadItemForm;



import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const UploadItemForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    address: "",
    price: "",
    tag: [], // Ensure this is an array
    contact: "",
    thumbnail: null,
  });
  const [tagInput, setTagInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
    validateForm({ ...formData, thumbnail: e.target.files[0] });
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      // Prevent duplicate tags
      const newTag = tagInput.trim();
      if (!formData.tag.includes(newTag)) {
        setFormData(prev => ({
          ...prev, 
          tag: [...prev.tag, newTag]
        }));
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev, 
      tag: prev.tag.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = (data) => {
    const isValid =
      data.courseName &&
      data.courseDescription &&
      data.address &&
      data.price &&
      data.contact &&
      data.thumbnail &&
      data.tag.length > 0; // Ensure at least one tag
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { courseName, courseDescription, address, price, tag, contact, thumbnail } = formData;
  
    const formDataToSend = new FormData();
    formDataToSend.append("courseName", courseName);
    formDataToSend.append("courseDescription", courseDescription);
    formDataToSend.append("address", address);
    formDataToSend.append("price", price);
    formDataToSend.append("contact", contact);
  
    // Correctly append tags to match backend schema
    tag.forEach((t, index) => {
      formDataToSend.append("tag", t);
    });
  
    // Ensure thumbnail is added
    if (thumbnail) {
      formDataToSend.append("thumbnailImage", thumbnail);
    }
  
    const token = JSON.parse(localStorage.getItem("token"));
  
    try {
      const response = await fetch(`http://localhost:4000/api/v1/course/createCourse`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Full error response:', errorText);
        throw new Error(errorText || "Failed to create course");
      }
  
      const result = await response.json();
      console.log("Success Response:", result);
      toast.success("Course created successfully!");
    } catch (error) {
      console.error('Detailed error:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Create Course</h2>

        {/* Previous input fields remain the same */}
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        <textarea
          name="courseDescription"
          placeholder="Course Description"
          value={formData.courseDescription}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        ></textarea>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        {/* Updated Tags Section */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="w-full p-2 rounded bg-zinc-700 text-white"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Tags Display with Remove Functionality */}
        <div className="mb-4 flex flex-wrap gap-2">
          {formData.tag.map((t, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-zinc-600 text-white px-2 py-1 rounded"
            >
              {t}
              <button
                type="button"
                onClick={() => handleRemoveTag(t)}
                className="ml-2 text-red-300 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        />

        {isFormValid && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded mt-4"
          >
            Submit
          </motion.button>
        )}
      </motion.form>
    </div>
  );
};

export default UploadItemForm;