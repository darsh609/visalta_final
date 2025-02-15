// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { FaWhatsapp, FaEnvelope, FaCopy } from 'react-icons/fa';
// // import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

// // import { toast } from 'react-hot-toast';

// // import { useSelector } from 'react-redux';


// // const DeleteIcon = () => (
// //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <polyline points="3 6 5 6 21 6"></polyline>
// //     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
// //   </svg>
// // );

// // // SVG Icons (same as previous implementation)
// // const WhatsappIcon = () => (
// //   <svg 
// //     xmlns="http://www.w3.org/2000/svg" 
// //     width="24" 
// //     height="24" 
// //     viewBox="0 0 24 24" 
// //     fill="green"
// //   >
// //     <path d="M12.036 5.339c-3.684 0-6.656 2.911-6.656 6.5 0 1.726.685 3.295 1.810 4.449l-1.190 3.562 3.737-1.157c1.137.748 2.498 1.184 3.957 1.184 3.684 0 6.656-2.911 6.656-6.5s-2.972-6.5-6.656-6.5zm3.498 9.087c-.175.495-.977.964-1.323 1.046-.697.132-1.226.067-2.654-.569-2.201-.888-3.569-3.084-3.679-3.233-.109-.149-.888-1.177-.849-2.234.039-1.056.617-1.567.838-1.793.222-.226.487-.282.65-.282s.325.006.468.018c.156.013.365-.059.572.434.214.502.708 1.735.772 1.862.064.127.106.275.021.434-.085.159-.127.259-.254.398-.127.139-.268.312-.382.417-.127.112-.26.235-.112.461.148.226.662.974 1.417 1.662.975.865 1.762 1.152 2.007 1.281.246.128.39.106.536-.064.145-.171.617-.721.781-.97s.324-.213.544-.127c.221.085 1.407.662 1.653.784.246.121.41.183.471.285.061.102.061.582-.114 1.077z"/>
// //   </svg>
// // );

// // const Input = ({ placeholder, value, onChange, className }) => (
// //   <input
// //     type="text"
// //     placeholder={placeholder}
// //     value={value}
// //     onChange={onChange}
// //     className={`border rounded p-2 ${className}`}
// //   />
// // );

// // const Button = ({ onClick, children, className }) => (
// //   <button
// //     onClick={onClick}
// //     className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
// //   >
// //     {children}
// //   </button>
// // );

// // const Card = ({ children, className }) => (
// //   <div className={`border rounded shadow-md ${className}`}>
// //     {children}
// //   </div>
// // );

// // const CardHeader = ({ children, className }) => (
// //   <div className={`p-4 border-b ${className}`}>
// //     {children}
// //   </div>
// // );

// // const CardContent = ({ children, className }) => (
// //   <div className={`p-4 ${className}`}>
// //     {children}
// //   </div>
// // );




// // const CourseCard = ({ course, searchTerm, onDelete,deleteCourse,setShowModal, setCourseToDelete }) => {
// //   const handleCopyToClipboard = (text) => {
// //     navigator.clipboard.writeText(text)
// //       .then(() => toast.success('Copied to clipboard!'))
// //       .catch(() => toast.error('Failed to copy'));
// //   };

// //   const openWhatsApp = () => {
// //     window.open(`https://wa.me/${course.contact}`, '_blank');
// //   };

// //   const openEmail = () => {
// //     window.open(`mailto:${course.instructor.email}`);
// //   };


// //   const calculateTimeDifference = (createdAt) => {
// //     const now = new Date();
// //     const created = new Date(createdAt);
// //     const diffInMilliseconds = now - created;
// //     const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
// //     const diffInMinutes = Math.floor(diffInSeconds / 60);
// //     const diffInHours = Math.floor(diffInMinutes / 60);
// //     const diffInDays = Math.floor(diffInHours / 24);

// //     if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
// //     if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
// //     if (diffInHours < 24) return `${diffInHours} hr ago`;
// //     return `${diffInDays} days ago`;
// //   };

// //   const handleCopyContact = (text) => {
// //     try {
// //       navigator.clipboard.writeText(text)
// //         .then(() => toast.success('Copied to clipboard!'))
// //         .catch(() => toast.error('Failed to copy'));
// //     } catch (err) {
// //       toast.error('Copy failed');
// //     }
// //   };

// //   const highlightText = (text, searchTerm) => {
// //     if (!searchTerm) return text;
// //     const regex = new RegExp(`(${searchTerm})`, 'gi');
// //     return text.split(regex).map((part, index) => 
// //       part.toLowerCase() === searchTerm.toLowerCase() ? 
// //       <mark key={index} className="bg-yellow-200 text-black">{part}</mark> : part
// //     );
// //   };

 
// //   const renderTags = () => {
// //     const tagColors = [
// //       'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 
// //       'bg-sky-500', 'bg-blue-500', 'bg-indigo-500'
// //     ];
    
// //     return course.tag && course.tag.map((tag, index) => (
// //       <div 
// //         key={index} 
// //         className={`${tagColors[index % tagColors.length]} 
// //                     text-white px-2 py-1 rounded-full text-xs 
// //                     inline-block mr-2 mb-2 transform 
// //                     transition hover:scale-110`}
// //       >
// //         {tag}
// //       </div>
// //     ));
// //   };

// //   const handleDelete = () => {
// //     const confirmDelete = window.confirm('Are you sure you want to delete this course?');
// //     if (confirmDelete) {
// //       onDelete(course._id);
// //     }
// //   };


// //   useEffect(() => {

// //     console.log("course._id",course.studentsEnrolled)
// //   }, [course._id]);

// //   const { user } = useSelector((state) => state.profile);
// //   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
// //   const [isSaved, setIsSaved] = useState(
// //     course.studentsEnrolled?.includes(user?._id)
// //   );
// //   const [isLoading, setIsLoading] = useState(false);

// //   const toggleDescription = () => {
// //     setIsDescriptionExpanded(!isDescriptionExpanded);
// //   };

// //   const handleSaveToggle = async () => {
// //     try {
// //       setIsLoading(true);
// //       const token = JSON.parse(localStorage.getItem("token"));
// //       const url = `${process.env.REACT_APP_BASE_URL}/course/${
// //         isSaved ? "dislike" : "dolike"
// //       }`;

// //       await axios.post(
// //         url,
// //         { courseId: course._id },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       setIsSaved(!isSaved);
// //       toast.success(isSaved ? "Course unsaved!" : "Course saved!", {
// //         style: {
// //           background: "#4B5563",
// //           color: "white",
// //         },
// //         icon: isSaved ? "❌" : "📚",
// //       });
// //     } catch (error) {
// //       console.error("Error saving/unsaving course:", error);
// //       toast.error("Failed to toggle save state!");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };


// //   return (
// //     <div 
      
// //       className="cursor-pointer hover:bg-green-900/20 transition-all duration-300 
// //                  transform hover:scale-105 hover:shadow-2xl border border-green-800/50"
// //     >
// //       <Card className="w-full mb-4 bg-zinc-800 border-zinc-700">
// //       {user?.accountType === 'Admin' && (
// //   <button
// //     onClick={() => {
// //       setShowModal(true);
// //       setCourseToDelete(course);
// //     }}
// //     className="absolute bottom-4 right-4 p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-105 z-10"
// //     title="Delete Course"
// //   >
// //     <DeleteIcon/>
  
// //   </button>
// //                        )}

// // <div className="absolute bottom-4 left-4 z-10">
// //           <button 
// //             onClick={handleSaveToggle}
// //             disabled={isLoading}
// //             className="p-2 bg-zinc-900/50 rounded-full hover:bg-zinc-900/75 transition flex items-center justify-center"
// //             title={isSaved ? "Unsave Course" : "Save Course"}
// //           >
// //             {isLoading ? (
// //               <div className="animate-spin">
// //                 <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
// //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                 </svg>
// //               </div>
// //             ) : isSaved ? (
// //               <FaBookmark className="text-blue-500 text-4xl" />
// //             ) : (
// //               <FaRegBookmark className="text-gray-300 text-4xl" />
// //             )}
// //           </button>
// //         </div>
      
// //         <CardHeader className="flex justify-between items-center bg-zinc-900">
// //           <div className="flex items-center space-x-2">
// //             <div>{highlightText(course.courseName, searchTerm)}</div>
// //             <div className="flex flex-wrap">{renderTags()}</div>
// //           </div>
// //           <div className="text-sm text-gray-400">
// //             {calculateTimeDifference(course.createdAt)}
// //           </div>
// //         </CardHeader>
// //         <CardContent className="flex">
// //           <img 
// //             src={course.thumbnail} 
// //             alt={course.courseName} 
// //             className="w-1/3 h-48 object-cover mr-4 rounded"
// //           />
          
// //           <div className="w-2/3">
// //             <div className="mb-2">
// //               <strong>Instructor:</strong> {highlightText(`${course.instructor.firstName} ${course.instructor.lastName}`, searchTerm)}
// //             </div>
// //             <div className="mb-2">
// //               <strong>Description:</strong> 
// //               {course.courseDescription.length > 100 ? (
// //                 <>
// //                   {isDescriptionExpanded 
// //                     ? course.courseDescription 
// //                     : `${course.courseDescription.slice(0, 100)}...`}
// //                   <span 
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       toggleDescription();
// //                     }}
// //                     className="text-blue-500 cursor-pointer ml-2"
// //                   >
// //                     {isDescriptionExpanded ? 'Read Less' : 'Read More'}
// //                   </span>
// //                 </>
// //               ) : (
// //                 course.courseDescription
// //               )}
// //             </div>
// //             <div className="mb-2">
// //               <strong>Address:</strong> {highlightText(course.address, searchTerm)}
// //             </div>
// //             <div className="mb-2">
// //               <strong>Price:</strong> ₹{highlightText(course.price.toLocaleString(), searchTerm)}
// //             </div>
// //             <div className="mb-2">
// //               <strong>Number of likes:</strong> {course.studentsEnrolled.length}
// //             </div>
// //             <div className="flex space-x-4 mt-2 items-center">
// //             </div>
// //             <div className="flex space-x-2">
// //               <div>
// //               <button 
// //             onClick={openWhatsApp}
// //             className="text-green-500 hover:text-green-400 transition"
// //           >
// //             <FaWhatsapp size={24} />
// //           </button>
// //               </div>
          
// //           <div>
// //           <button 
// //             onClick={openEmail}
// //             className="text-blue-500 hover:text-blue-400 transition"
// //           >
// //             <FaEnvelope size={24} />
// //           </button>
// //           </div>
          
// //         </div>

// //         <div className=" mt-32 flex space-x-2">
// //           <div>
// //           <button 
// //             onClick={() => handleCopyToClipboard(course.contact)}
// //             className="text-gray-400 hover:text-white transition"
// //           >
// //             <FaCopy size={40} />
// //           </button>
// //           </div>
// //           <div>
// //           <button 
// //             onClick={() => handleCopyToClipboard(course.instructor.email)}
// //             className="text-gray-400 hover:text-white transition"
// //           >
// //             <FaCopy size={40} />
// //           </button>

// //           </div>
         
// //         </div>
// //         <div className=' mt-20'>

// //         <a href="mailto:example@example.com" onClick={(e) => e.preventDefault()}>
// //   <button onClick={() => handleCopyToClipboard('example@example.com')}>📋</button>
// // </a>

// //         </div>


            

// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };


// // const BuyPage = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [filteredCourses, setFilteredCourses] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [sortOrder, setSortOrder] = useState('asc');
// //   const [hostelFilter, setHostelFilter] = useState(false);
// //   const [filterType, setFilterType] = useState('all'); // 'all', 'latest', 'hostel'
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const deleteCourse = async (courseId) => {
// //     console.log(courseId)
// //     try {
// //       const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/course/deleteCourse`, {
// //         courseId: courseId,
// //       });
// //       console.log("------->",response)
  
// //       if (response.data.success) {
// //         toast.success('Course deleted successfully');
// //         // Update the state to reflect the deleted course
// //         setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
// //         setFilteredCourses((prevFiltered) => prevFiltered.filter(course => course._id !== courseId));
// //       } else {
// //         throw new Error(response.data.message || 'Failed to delete course');
// //       }
// //     } catch (error) {
// //       console.error('Error deleting course:', error);
// //       toast.error(error.message || 'Failed to delete course');
// //     }
// //   };

// //   const { user } = useSelector((state) => state.profile);
// //   // console.log("oooooooooo--------------->",user)
// //   const userHostel = user?.additionalDetails?.hostel;

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       const token = JSON.parse(localStorage.getItem("token"));
// //       try {
// //         setIsLoading(true);
// //         const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/course/getAllCourses`, {
// //           headers: {
// //             'Authorization': `Bearer ${token}`
// //           }
// //         });
        
// //         const coursesData = response.data?.courses || 
// //                     response.data?.data || 
// //                     (Array.isArray(response.data) ? response.data : []);

// // // Reverse the coursesData array
// // const reversedCoursesData = [...coursesData].reverse();
// //                     console.log(coursesData);

        
// //         setCourses(reversedCoursesData);
// //         setFilteredCourses(reversedCoursesData);
// //         setError(null);
// //       } catch (error) {
// //         console.error('Error fetching courses', error);
// //         setError(error.message);
// //         setCourses([]);
// //         setFilteredCourses([]);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
  
// //     fetchCourses();
// //   }, []);

// //   const handleSearch = (e) => {
// //     const term = e.target.value.toLowerCase();
// //     setSearchTerm(term);
    
// //     const filtered = courses.filter(course => 
// //       ['courseName', 'courseDescription', 'instructor.firstName', 'instructor.lastName', 'address', 'price','tag']
// //         .some(field => {
// //           const value = field.split('.').reduce((obj, key) => obj?.[key], course);
// //           return String(value).toLowerCase().includes(term);
// //         })
// //     );
    
// //     setFilteredCourses(filtered);
// //   };

// //   const [showModal, setShowModal] = useState(false);
// //   const [courseToDelete, setCourseToDelete] = useState(null);
  

// //   const handleSort = () => {
// //     const sorted = [...filteredCourses].sort((a, b) => 
// //       sortOrder === 'asc' ? a.price - b.price : b.price - a.price
// //     );
// //     setFilteredCourses(sorted);
// //     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
// //   };

// //   const handleFilterChange = (type) => {
// //     setFilterType(type);
// //     let filtered = courses;

// //     if (type === 'latest') {
// //       filtered = courses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// //     } else if (type === 'hostel' && userHostel) {
// //       filtered = courses.filter(
// //         course => course.address.toLowerCase().includes(userHostel.toLowerCase())
// //       );
// //     }

// //     setFilteredCourses(filtered);
// //   };


// //   const handleHostelFilter = () => {
// //     setHostelFilter(!hostelFilter);
    
// //     if (!hostelFilter && userHostel) {
// //       const hostelFilteredCourses = courses.filter(
// //         course => course.address.toLowerCase().includes(userHostel.toLowerCase())
// //       );
// //       setFilteredCourses(hostelFilteredCourses);
// //     } else {
// //       setFilteredCourses(courses);
// //     }
// //   };

// //   if (isLoading) return (
// //     <div className="flex justify-center items-center h-screen animate-pulse">
// //       Loading...
// //     </div>
// //   );

// //   if (error) return (
// //     <div className="text-red-500 text-center mt-10">
// //       Error: {error}
// //     </div>
// //   );

// //   return (
// //     <div className="container mx-auto p-4 bg-zinc-900 min-h-screen text-white">
// //       <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
// //         <Input 
// //           placeholder="Search courses..." 
// //           value={searchTerm}
// //           onChange={handleSearch}
// //           className="flex-grow bg-zinc-800 text-white border-zinc-700 
// //                      transition transform hover:scale-105 focus:scale-105 
// //                      focus:border-blue-500"
// //         />
// //         <div className="flex space-x-4">
// //           <Button 
// //             onClick={handleSort} 
// //             className="bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105"
// //           >
// //             Sort by Price {sortOrder === 'asc' ? '↑' : '↓'}
// //           </Button>
// //           {userHostel && (
// //             <Button 
// //               onClick={handleHostelFilter} 
// //               className={`transition transform hover:scale-105 ${
// //                 hostelFilter 
// //                   ? 'bg-green-600 hover:bg-green-700' 
// //                   : 'bg-zinc-700 hover:bg-zinc-600'
// //               }`}
// //             >
// //               {hostelFilter ? 'My Hostel Courses' : 'Filter by My Hostel'}
// //             </Button>
// //           )}
// //         </div>
// //       </div>
      
// //       {filteredCourses.length === 0 ? (
// //         <div className="text-center text-gray-400 animate-fade-in">
// //           No courses found
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //           {filteredCourses.map(course => (
// //             <div>
              
// //                  <CourseCard 
// //               key={course._id} 
// //               course={course} 
// //               searchTerm={searchTerm}
// //               deleteCourse={(courseId) => {
// //                 deleteCourse(courseId, setCourses, setFilteredCourses);
              
// //               }}
// //               setShowModal={setShowModal}
// //               setCourseToDelete={setCourseToDelete}
// //               className="transition transform hover:scale-105 hover:shadow-xl"
// //             />
// //         </div>

// //           ))}
// //         </div>
// //       )}




// //       {/* Confirmation Modal */}
// //       {showModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// //           <div className="bg-white p-6 rounded-lg shadow-lg text-black w-80">
// //             <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
// //             <p className="mb-6">
// //               Are you sure you want to delete the course <strong>{courseToDelete?.courseName}</strong>?
// //             </p>
// //             <div className="flex justify-end space-x-4">
// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   deleteCourse(courseToDelete._id);
// //                   setShowModal(false);
// //                 }}
// //                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BuyPage;

















































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaWhatsapp, FaEnvelope, FaCopy } from 'react-icons/fa';
// import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
// import emailjs from 'emailjs-com';


// import { toast } from 'react-hot-toast';
// import { useSelector } from 'react-redux';

// const DeleteIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="3 6 5 6 21 6"></polyline>
//     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//   </svg>
// );

// const Input = ({ placeholder, value, onChange, className }) => (
//   <input
//     type="text"
//     placeholder={placeholder}
//     value={value}
//     onChange={onChange}
//     className={`border rounded p-2 ${className}`}
//   />
// );

// const Button = ({ onClick, children, className }) => (
//   <button
//     onClick={onClick}
//     className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
//   >
//     {children}
//   </button>
// );

// const EmailConfirmationModal = ({ show, onCancel, onConfirm }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       {/* Modal Overlay */}
//       <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
//       {/* Modal Content */}
//       <div className="bg-zinc-900 text-white p-6 rounded shadow-lg z-10 max-w-xs w-full">
//         <h3 className="text-xl font-semibold text-center mb-4">Confirm Inquiry</h3>
//         <p className="text-center mb-6">
//           Are you sure you want to send your inquiry for additional details to the product owner?
//         </p>
//         <div className="flex justify-around">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded"
//           >
//             Yes, Send Inquiry
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// // const CourseCard = ({ course, searchTerm, onDelete, deleteCourse, setShowModal, setCourseToDelete }) => {
// //   const { user } = useSelector((state) => state.profile);
// //   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
// //   const [isSaved, setIsSaved] = useState(
// //     course.studentsEnrolled?.includes(user?._id)
// //   );
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showMoreInfo, setShowMoreInfo] = useState(false);

// //    // Function to truncate description by words
// //    const truncateByWords = (text, limit = 12) => {
// //     const words = text.split(' ');
// //     if (words.length > limit) {
// //       return words.slice(0, limit).join(' ') + '...';
// //     }
// //     return text;
// //   };

// // EmailConfirmationModal.jsx








// const CourseCard = ({ course, searchTerm, onDelete,deleteCourse,setShowModal, setCourseToDelete,
  
//  }) => {
//   // const { user } = useSelector((state) => state.profile);
//   const { user } = useSelector((state) => state.profile);
//   console.log("user",user)
//   const [showEmailModal, setShowEmailModal] = useState(false);



//   // const [isSaved, setIsSaved] = useState(course.isSaved || false);
//   // const [isLoading, setIsLoading] = useState(false);
//   const handleCopyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//       .then(() => toast.success('Copied to clipboard!'))
//       .catch(() => toast.error('Failed to copy'));
//   };

  
// const openWhatsApp = (e) => {
//   // Prevent the click from triggering any parent onClick handlers
//   e.stopPropagation();

//   // Construct the message with user and product details.
//   const message = `Hello! 🙋‍♂️

// I'm ${user.firstName} from ${user.additionalDetails.hostel}. I discovered your listing on Visalta and I'm very interested in your product.

// Product Details:
// • Name: ${course.courseName}
// • Price: ₹${course.price.toLocaleString()}

// I have a few questions:
// 1. Is the product still available?
// 2. Can you share details about its condition and functionality?
// 3. Is there any possibility of a discount?

// Looking forward to your reply.

// Best regards,
// ${user.firstName}`;
//   // URL-encode the message so that spaces and special characters are properly formatted.
//   const encodedMessage = encodeURIComponent(message);

//   // Build the WhatsApp URL (make sure course.contact is in international format without '+' or '00')
//   const whatsappUrl = `https://wa.me/${course.contact}?text=${encodedMessage}`;

//   // Open WhatsApp in a new tab/window.
//   window.open(whatsappUrl, '_blank');
// };

// const htmlMessage = `
//   <div style="background-color: #1a1a1a; color: #fff; font-family: Arial, sans-serif; padding: 20px;">
//     <div style="text-align: center; margin-bottom: 20px;">
//       <img src="https://i.postimg.cc/25V8F6Nh/Visalta.jpg" alt="Visalta Logo" style="max-width: 150px;">
//     </div>
//     <h2 style="color: #a8d5ba;">Hello!</h2>
//     <p>
//       I'm <strong>${user.firstName}</strong> from <strong>${user.additionalDetails.hostel}</strong>. I discovered your listing on <strong>Visalta</strong> and I'm very interested in your second-hand product.
//     </p>
//     <h3 style="color: #a8d5ba;">Product Details:</h3>
//     <p>
//       <strong>Name:</strong> ${course.courseName}<br>
//       <strong>Price:</strong> ₹${course.price.toLocaleString()}
//     </p>
//     <div style="text-align: center; margin: 20px 0;">
//       <img src="${course.thumbnail}" alt="${course.courseName}" style="max-width: 300px; border: 2px solid #a8d5ba; border-radius: 8px;">
//     </div>
//     <p><strong>Contact Number:</strong> ${user.additionalDetails.contactNumber}</p>
//      <p><strong>Contact Email:</strong> ${user.email}</p>
//     <p>I have a few questions:</p>
//     <ol>
//       <li>Is the product still available?</li>
//       <li>Can you share details about its condition and functionality?</li>
//       <li>Is there any possibility of a discount?</li>
//     </ol>
//     <p>Looking forward to your reply.</p>
//     <p>Best regards,<br><strong>${user.firstName}</strong></p>
//     <p style="font-style: italic; margin-top: 20px;">This email was sent by the VISALTA team.</p>
//   </div>
// `;
//   const subject = `Inquiry: Request for More Details about ${course.courseName} from Visalta`;



// // const sendEmail = () => {
// //   // Build the template parameters matching your EmailJS template
// //   const templateParams = {
// //     subject, // This will fill in the {{subject}} placeholder in your EmailJS template
// //     from_name: user.firstName,
// //     from_hostel: user.additionalDetails.hostel,
// //     product_name: course.courseName,
// //     product_price: `₹${course.price.toLocaleString()}`,
// //     to_name: course.instructor.firstName,
// //     message: htmlMessage, // Sending the HTML email body
// //     to_email: course.instructor.email
// //   };

// //   // Replace with your actual EmailJS IDs
// //   const serviceID = 'service_s7b9s1v';
// //   const templateID = 'template_fkv8gud';
// //   const userID = 'NnYBFTHd9piExxQjw';

// //   toast.promise(
// //     emailjs.send(serviceID, templateID, templateParams, userID),
// //     {
// //       pending: 'Sending email...',
// //       success: 'Email sent successfully!',
// //       error: 'Failed to send email.'
// //     }
// //   )
// //   .then(() => {
// //     setShowEmailModal(false);
// //   })
// //   .catch((err) => {
// //     console.error('Email send error: ', err);
// //   });
// // };


// const sendEmail = () => {
//   // Build the template parameters for the product owner's email
//   const templateParams = {
//     subject, // Fills in the {{subject}} placeholder
//     from_name: user.firstName,
//     from_hostel: user.additionalDetails.hostel,
//     product_name: course.courseName,
//     product_price: `₹${course.price.toLocaleString()}`,
//     to_name: course.instructor.firstName,
//     message: htmlMessage, // The HTML email body for the owner
//     to_email: course.instructor.email
//   };

//   // Replace with your actual EmailJS IDs
//   const serviceID = 'service_s7b9s1v';
//   const templateID = 'template_fkv8gud';
//   const userID = 'NnYBFTHd9piExxQjw';

//   // Build a response email for the user that is a copy of the owner's email
//   // with an additional header informing them that their inquiry has been forwarded.
//   const ssubject = "Inquiry Received – Seller Will Contact You Shortly!";

// const responseHtmlMessage = `
//   <div style="background-color: #1a1a1a; color: #fff; font-family: Arial, sans-serif; padding: 20px;">
//     <div style="text-align: center; margin-bottom: 20px;">
    
//     </div>
//     <h2 style="color: #a8d5ba;">Inquiry Confirmed!</h2>
//     <p>
//       Hi ${user.firstName},<br><br>
//       We’ve successfully forwarded your inquiry regarding <strong>${course.courseName}</strong> to the seller.
//       Expect to hear from them soon – they will be in touch with you directly.
//     </p>
//     <p>
//       Below is a copy of the message we sent for your reference:
//     </p>
//     <hr style="border: 1px solid #a8d5ba; margin: 20px 0;">
//     ${htmlMessage}
//     <p style="margin-top: 20px; font-style: italic;">
//       Thank you for choosing Visalta -Navigating Student's Life!
//     </p>
//   </div>
// `;


//   // Define the template parameters for the response email to the user
//   const responseTemplateParams = {
//     subject: `${ssubject}`,
//     from_name: 'VISALTA Team',
//     to_name: user.firstName,
//     message: responseHtmlMessage, // This is the modified copy including the header
//     to_email: user.email
//   };


//   // Assume the response email uses a second template ID from EmailJS:
  

//   // Send the inquiry email to the product owner first
//   toast.promise(
//     emailjs.send(serviceID, templateID, templateParams, userID),
//     {
//       pending: 'Sending inquiry...',
//       success: 'Inquiry sent successfully!',
//       error: 'Failed to send inquiry.'
//     }
//   )
//   .then(() => {
//     // After successful sending, send the confirmation email to the user
//     emailjs.send(serviceID, templateID, responseTemplateParams, userID)
//       .then((response) => {
//         console.log('Response email sent!', response.status, response.text);
//         setShowEmailModal(false);
//       })
//       .catch((err) => {
//         console.error('Error sending response email: ', err);
//         setShowEmailModal(false);
//       });
//   })
//   .catch((err) => {
//     console.error('Error sending inquiry email: ', err);
//   });
// };

// const openEmailModal = (e) => {
//   e.stopPropagation();
//   setShowEmailModal(true);
// };

// // Handler when user confirms sending the email
// const handleConfirmEmail = (e) => {
//   e.stopPropagation();
//   sendEmail();
//   setShowEmailModal(false);
// };
//   const calculateTimeDifference = (createdAt) => {
//     const now = new Date();
//     const created = new Date(createdAt);
//     const diffInMilliseconds = now - created;
//     const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     const diffInHours = Math.floor(diffInMinutes / 60);
//     const diffInDays = Math.floor(diffInHours / 24);

//     if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
//     if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
//     if (diffInHours < 24) return `${diffInHours} hr ago`;
//     return `${diffInDays} days ago`;
//   };

//   const highlightText = (text, searchTerm) => {
//     if (!searchTerm) return text;
//     const regex = new RegExp(`(${searchTerm})`, 'gi');
//     return text.split(regex).map((part, index) => 
//       part.toLowerCase() === searchTerm.toLowerCase() ? 
//       <mark key={index} className="bg-yellow-200 text-black">{part}</mark> : part
//     );
//   };

 
//   const renderTags = () => {
//     const tagColors = [
//       'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 
//       'bg-sky-500', 'bg-blue-500', 'bg-indigo-500'
//     ];
    
//     return course.tag && course.tag.map((tag, index) => (
//       <div 
//         key={index} 
//         className={`${tagColors[index % tagColors.length]} 
//                     text-white px-2 py-1 rounded-full text-xs 
//                     inline-block mr-2 mb-2 transform 
//                     transition hover:scale-110`}
//       >
//         {tag}
//       </div>
//     ));
//   };

//   const handleDelete = () => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this course?');
//     if (confirmDelete) {
//       onDelete(course._id);
//     }
//   };

//   // const toggleDescription = () => {
//   //   setIsDescriptionExpanded(!isDescriptionExpanded);
//   // };


//   // Persist save state in localStorage
//   useEffect(() => {
//     // const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
//     // setIsSaved(savedCourses.includes(course._id));

//     console.log("course._id",course.studentsEnrolled)
//     console.log("user",user)
//   }, [course._id]);

  
//   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
//   const [isSaved, setIsSaved] = useState(
//     course.studentsEnrolled?.includes(user?._id)
//   );
//   const [isLoading, setIsLoading] = useState(false);

//   const toggleDescription = () => {
//     setIsDescriptionExpanded(!isDescriptionExpanded);
//   };

//   const handleSaveToggle = async () => {
//     try {
//       setIsLoading(true);
//       const token = JSON.parse(localStorage.getItem("token"));
//       const url = `${process.env.REACT_APP_BASE_URL}/course/${
//         isSaved ? "dislike" : "dolike"
//       }`;

//       await axios.post(
//         url,
//         { courseId: course._id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setIsSaved(!isSaved);
//       toast.success(isSaved ? "Course unsaved!" : "Course saved!", {
//         style: {
//           background: "#4B5563",
//           color: "white",
//         },
//         icon: isSaved ? "❌" : "📚",
//       });
//     } catch (error) {
//       console.error("Error saving/unsaving course:", error);
//       toast.error("Failed to toggle save state!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div 
//   className="cursor-pointer hover:bg-green-900/20 transition-all duration-300 
//              transform hover:scale-105 hover:shadow-2xl border border-green-800/50"
// >
//   <Card className="w-full mb-4 bg-zinc-800 border-zinc-700">
//     {user?.accountType === 'Admin' && (
//       <button
//         onClick={() => {
//           setShowModal(true);
//           setCourseToDelete(course);
//         }}
//         className="absolute bottom-4 right-4 p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-105 z-10"
//         title="Delete Course"
//       >
//         <DeleteIcon/>
//       </button>
//     )}

//     <div className="absolute bottom-4 left-4 z-10">
//       <button 
//         onClick={handleSaveToggle}
//         disabled={isLoading}
//         className="p-2 bg-zinc-900/50 rounded-full hover:bg-zinc-900/75 transition flex items-center justify-center"
//         title={isSaved ? "Unsave Course" : "Save Course"}
//       >
//         {isLoading ? (
//           <div className="animate-spin">
//             <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//           </div>
//         ) : isSaved ? (
//           <FaBookmark className="text-blue-500 text-4xl" />
//         ) : (
//           <FaRegBookmark className="text-gray-300 text-4xl" />
//         )}
//       </button>
//     </div>

//     <CardHeader className="flex justify-between items-center bg-zinc-900">
//       <div className="flex items-center space-x-2">
//         <div>{highlightText(course.courseName, searchTerm)}</div>
//         <div className="flex flex-wrap">{renderTags()}</div>
//       </div>
//       <div className="text-sm text-gray-400">
//         {calculateTimeDifference(course.createdAt)}
//       </div>
//     </CardHeader>
//     <CardContent className="flex">
//       <img 
//         src={course.thumbnail} 
//         alt={course.courseName} 
//         className="w-1/3 h-48 object-cover mr-4 rounded"
//       />
      
//       <div className="w-2/3">
//         <div className="mb-2">
//           <strong>Instructor:</strong> {highlightText(`${course.instructor.firstName} ${course.instructor.lastName}`, searchTerm)}
//         </div>
//         <div className="mb-2">
//           <strong>Description:</strong> 
//           {course.courseDescription.length > 100 ? (
//             <>
//               {isDescriptionExpanded 
//                 ? course.courseDescription 
//                 : `${course.courseDescription.slice(0, 100)}...`}
//               <span 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleDescription();
//                 }}
//                 className="text-blue-500 cursor-pointer ml-2"
//               >
//                 {isDescriptionExpanded ? 'Read Less' : 'Read More'}
//               </span>
//             </>
//           ) : (
//             course.courseDescription
//           )}
//         </div>
//         <div className="mb-2">
//           <strong>Address:</strong> {highlightText(course.address, searchTerm)}
//         </div>
//         <div className="mb-2">
//           <strong>Price:</strong> ₹{highlightText(course.price.toLocaleString(), searchTerm)}
//         </div>
//         <div className="mb-2">
//           <strong>Number of likes:</strong> {course.studentsEnrolled.length}
//         </div>
//         <div className="flex space-x-4 mt-2 items-center">
//           <div className="flex items-center">
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 openWhatsApp(e);
//               }}
//               className="text-green-500 hover:text-green-400 transition"
//               title="Contact via WhatsApp"
//             >
//               <FaWhatsapp size={24} />
//             </button>
//           </div>
//           <div>
//           <button 
//               onClick={openEmailModal}
//               className="text-blue-500 hover:text-blue-400 transition"
//               title="Contact via Email"
//             >
//               <FaEnvelope size={24} />
//             </button>
//             </div>
//         </div>

//         <div className="mt-32 flex space-x-2">
//           <div>
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleCopyToClipboard(course.contact);
//               }}
//               className="text-gray-400 hover:text-white transition"
//             >
//               <FaCopy size={40} />
//             </button>
//           </div>
//           <div>
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleCopyToClipboard(course.instructor.email);
//               }}
//               className="text-gray-400 hover:text-white transition"
//             >
//               <FaCopy size={40} />
//             </button>
//           </div>
//         </div>
//         <div className="mt-20">
//           <a href="mailto:example@example.com" onClick={(e) => e.preventDefault()}>
//             <button onClick={() => handleCopyToClipboard('example@example.com')}>📋</button>
//           </a>
//         </div>
//       </div>

//      {/* Email Confirmation Modal */}
  
//     </CardContent>
//   </Card>
//   <EmailConfirmationModal
//         show={showEmailModal}
//         onCancel={() => setShowEmailModal(false)}
//         onConfirm={handleConfirmEmail}
//       />
// </div>


//     <div className="bg-green-50 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl relative">
//     {/* Title */}
//     <div className="p-4 border-b border-green-100">
//       <h3 className="text-lg font-semibold text-black">
//         {highlightText(course.courseName, searchTerm)}
//       </h3>
//     </div>

//     {/* Image Container with fixed aspect ratio */}
//     <div className="relative aspect-square">
//       <img 
//         src={course.thumbnail} 
//         alt={course.courseName}
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//     </div>

//     {/* Content Section */}
//     <div className="p-4 space-y-3">
//       {/* Description */}
//       <div>
//         <span className="text-black font-medium">Description: </span>
//         <span className="text-black">
//           {isDescriptionExpanded ? course.courseDescription : 
//            `${course.courseDescription.slice(0, 10)}${course.courseDescription.length > 10 ? '...' : ''}`}
//           {course.courseDescription.length > 10 && (
//             <button 
//               onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
//               className="ml-2 text-green-700 hover:text-green-800"
//             >
//               {isDescriptionExpanded ? 'Show less' : 'Read more'}
//             </button>
//           )}
//         </span>
//       </div>

//       {/* Price */}
//       <div>
//         <span className="text-black font-medium">Price: </span>
//         <span className="text-black">₹{highlightText(course.price.toLocaleString(), searchTerm)}</span>
//       </div>

//       {/* More Information Button */}
//       <button
//         onClick={() => setShowMoreInfo(!showMoreInfo)}
//         className="w-full mt-4 px-4 py-2 bg-green-100 text-black rounded-md hover:bg-green-200 transition-colors"
//       >
//         {showMoreInfo ? 'Less Information' : 'More Information'}
//       </button>

//       {/* Expandable content */}
//       {showMoreInfo && (
//         <div className="space-y-3 pt-4 border-t border-green-100">
//           <div className="flex flex-wrap gap-2">
//             {course.tag?.map((tag, index) => (
//               <span key={index} className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
//                 {tag}
//               </span>
//             ))}
//           </div>

//           <div>
//             <span className="text-black font-medium">Instructor: </span>
//             <span className="text-black">
//               {highlightText(`${course.instructor.firstName} ${course.instructor.lastName}`, searchTerm)}
//             </span>
//           </div>

//           <div>
//             <span className="text-black font-medium">Address: </span>
//             <span className="text-black">{highlightText(course.address, searchTerm)}</span>
//           </div>

//           <div>
//             <span className="text-black font-medium">Number of likes: </span>
//             <span className="text-black">{course.studentsEnrolled.length}</span>
//           </div>

//           <div className="flex items-center space-x-6 mt-4">
//             <div className="space-y-2">
//               <button 
//                 onClick={openWhatsApp}
//                 className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
//               >
//                 <FaWhatsapp size={20} />
//               </button>
//               <button 
//                 onClick={() => handleCopyToClipboard(course.contact)}
//                 className="w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-green-50 text-black hover:bg-green-100 transition-colors"
//               >
//                 <FaCopy size={14} />
//               </button>
//             </div>

//             <div className="space-y-2">
//               <button 
//                 onClick={openEmail}
//                 className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
//               >
//                 <FaEnvelope size={20} />
//               </button>
//               <button 
//                 onClick={() => handleCopyToClipboard(course.instructor.email)}
//                 className="w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-green-50 text-black hover:bg-green-100 transition-colors"
//               >
//                 <FaCopy size={14} />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Admin Delete Button */}
//     {user?.accountType === 'Admin' && (
//       <button
//         onClick={() => {
//           setShowModal(true);
//           setCourseToDelete(course);
//         }}
//         className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
//       >
//         <DeleteIcon />
//       </button>
//     )}

//     {/* Save/Bookmark Button */}
//     <button 
//       onClick={handleSaveToggle}
//       disabled={isLoading}
//       className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-black hover:text-green-700 transition-colors"
//     >
//       {isLoading ? (
//         <div className="animate-spin">
//           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//         </div>
//       ) : isSaved ? (
//         <FaBookmark className="text-green-700" size={20} />
//       ) : (
//         <FaRegBookmark size={20} />
//       )}
//     </button>
//   </div>

//     </div>

    

//   );
// };

// const BuyPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [hostelFilter, setHostelFilter] = useState(false);
//   const [filterType, setFilterType] = useState('all');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

  
//   const [showModal, setShowModal] = useState(false);
//   const [courseToDelete, setCourseToDelete] = useState(null);

//   const { user } = useSelector((state) => state.profile);
//   const userHostel = user?.additionalDetails?.hostel;

//   const deleteCourse = async (courseId) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/course/deleteCourse`, {
//         courseId: courseId,
//       });

//       if (response.data.success) {
//         toast.success('Course deleted successfully');
//         setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
//         setFilteredCourses((prevFiltered) => prevFiltered.filter(course => course._id !== courseId));
//       } else {
//         throw new Error(response.data.message || 'Failed to delete course');
//       }
//     } catch (error) {
//       console.error('Error deleting course:', error);
//       toast.error(error.message || 'Failed to delete course');
//     }
//   };

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const token = JSON.parse(localStorage.getItem("token"));
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/course/getAllCourses`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         const coursesData = response.data?.courses || 
//                   response.data?.data || 
//                   (Array.isArray(response.data) ? response.data : []);

//         const reversedCoursesData = [...coursesData].reverse();
        
//         setCourses(reversedCoursesData);
//         setFilteredCourses(reversedCoursesData);
//         setError(null);
//       } catch (error) {
//         console.error('Error fetching courses', error);
//         setError(error.message);
//         setCourses([]);
//         setFilteredCourses([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     const filtered = courses.filter(course => 
//       ['courseName', 'courseDescription', 'instructor.firstName', 'instructor.lastName', 'address', 'price', 'tag']
//         .some(field => {
//           const value = field.split('.').reduce((obj, key) => obj?.[key], course);
//           return String(value).toLowerCase().includes(term);
//         })
//     );

//     setFilteredCourses(filtered);
//   };

//   const handleSort = () => {
//     const sorted = [...filteredCourses].sort((a, b) => 
//       sortOrder === 'asc' ? a.price - b.price : b.price - a.price
//     );
//     setFilteredCourses(sorted);
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   const handleFilterChange = (type) => {
//     setFilterType(type);
//     let filtered = courses;

//     if (type === 'latest') {
//       filtered = courses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     } else if (type === 'hostel' && userHostel) {
//       filtered = courses.filter(
//         course => course.address.toLowerCase().includes(userHostel.toLowerCase())
//       );
//     }

//     setFilteredCourses(filtered);
//   };

//   const handleHostelFilter = () => {
//     setHostelFilter(!hostelFilter);

//     if (!hostelFilter && userHostel) {
//       const hostelFilteredCourses = courses.filter(
//         course => course.address.toLowerCase().includes(userHostel.toLowerCase())
//       );
//       setFilteredCourses(hostelFilteredCourses);
//     } else {
//       setFilteredCourses(courses);
//     }
//   };

//   return (
//     <div className="container max-w-full p-9 bg-[#262629] min-h-full text-white">
//       <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
//         <Input 
//           placeholder="Search courses..." 
//           value={searchTerm}
//           onChange={handleSearch}
//           className="flex-grow bg-zinc-800 text-white border-zinc-700 focus:border-blue-500"
//         />
//         <div className="flex space-x-4">
//           <Button 
//             onClick={handleSort}
//             className="bg-blue-600 hover:bg-blue-700 transition"
//           >
//             Sort by Price {sortOrder === 'asc' ? '↑' : '↓'}
//           </Button>
//           {userHostel && (
//             <Button 
//               onClick={handleHostelFilter}
//               className={`transition ${
//                 hostelFilter 
//                   ? 'bg-green-600 hover:bg-green-700' 
//                   : 'bg-zinc-700 hover:bg-zinc-600'
//               }`}
//             >
//               {hostelFilter ? 'My Hostel Courses' : 'Filter by My Hostel'}
//             </Button>
//           )}
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-screen animate-pulse">
//           Loading...
//         </div>
//       ) : error ? (
//         <div className="text-red-500 text-center mt-10">
//           Error: {error}
//         </div>
//       ) : filteredCourses.length === 0 ? (
//         <div className="text-center text-gray-400 animate-fade-in">
//           No courses found
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {filteredCourses.map(course => (
//             <CourseCard 
//               key={course._id}
//               course={course}
//               searchTerm={searchTerm}
//               deleteCourse={deleteCourse}
//               setShowModal={setShowModal}
              
//               setCourseToDelete={setCourseToDelete}
//             />
//           ))}
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-black w-80">
//             <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
//             <p className="mb-6">
//               Are you sure you want to delete the course <strong>{courseToDelete?.courseName}</strong>?
//             </p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   deleteCourse(courseToDelete._id);
//                   setShowModal(false);
//                 }}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyPage;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaEnvelope, FaCopy } from 'react-icons/fa';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import emailjs from 'emailjs-com'
import { useSelector } from 'react-redux';

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

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
  const [showMoreInfo, setShowMoreInfo] = useState(false);

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
  
  
  
  // const sendEmail = () => {
  //   // Build the template parameters matching your EmailJS template
  //   const templateParams = {
  //     subject, // This will fill in the {{subject}} placeholder in your EmailJS template
  //     from_name: user.firstName,
  //     from_hostel: user.additionalDetails.hostel,
  //     product_name: course.courseName,
  //     product_price: `₹${course.price.toLocaleString()}`,
  //     to_name: course.instructor.firstName,
  //     message: htmlMessage, // Sending the HTML email body
  //     to_email: course.instructor.email
  //   };
  
  //   // Replace with your actual EmailJS IDs
  //   const serviceID = 'service_s7b9s1v';
  //   const templateID = 'template_fkv8gud';
  //   const userID = 'NnYBFTHd9piExxQjw';
  
  //   toast.promise(
  //     emailjs.send(serviceID, templateID, templateParams, userID),
  //     {
  //       pending: 'Sending email...',
  //       success: 'Email sent successfully!',
  //       error: 'Failed to send email.'
  //     }
  //   )
  //   .then(() => {
  //     setShowEmailModal(false);
  //   })
  //   .catch((err) => {
  //     console.error('Email send error: ', err);
  //   });
  // };
  
  
  const sendEmail = () => {
    // Build the template parameters for the product owner's email
    const templateParams = {
      subject, // Fills in the {{subject}} placeholder
      from_name: user.firstName,
      from_hostel: user.additionalDetails.hostel,
      product_name: course.courseName,
      product_price: `₹${course.price.toLocaleString()}`,
      to_name: course.instructor.firstName,
      message: htmlMessage, // The HTML email body for the owner
      to_email: course.instructor.email
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
      toast.success(isSaved ? "Course unsaved!" : "Course saved!", {
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
    <div className="bg-green-50 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl relative">
    {/* Title */}
    <div className="p-4 border-b border-green-100">
      <h3 className="text-lg font-semibold text-black">
        {highlightText(course.courseName, searchTerm)}
      </h3>
    </div>

    {/* Image Container with fixed aspect ratio */}
    <div className="relative aspect-square">
      <img 
        src={course.thumbnail} 
        alt={course.courseName}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>

    {/* Content Section */}
    <div className="p-4 space-y-3">
      {/* Description */}
      <div>
        <span className="text-black font-medium">Description: </span>
        <span className="text-black">
          {isDescriptionExpanded ? course.courseDescription : 
           `${course.courseDescription.slice(0, 10)}${course.courseDescription.length > 10 ? '...' : ''}`}
          {course.courseDescription.length > 10 && (
            <button 
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="ml-2 text-green-700 hover:text-green-800"
            >
              {isDescriptionExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </span>
      </div>

      {/* Price */}
      <div>
        <span className="text-black font-medium">Price: </span>
        <span className="text-black">₹{highlightText(course.price.toLocaleString(), searchTerm)}</span>
      </div>

      {/* More Information Button */}
      <button
        onClick={() => setShowMoreInfo(!showMoreInfo)}
        className="w-full mt-4 px-4 py-2 bg-green-100 text-black rounded-md hover:bg-green-200 transition-colors"
      >
        {showMoreInfo ? 'Less Information' : 'More Information'}
      </button>

      {/* Expandable content */}
      {showMoreInfo && (
        <div className="space-y-3 pt-4 border-t border-green-100">
          <div className="flex flex-wrap gap-2">
            {course.tag?.map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {tag}
              </span>
            ))}
          </div>

          <div>
            <span className="text-black font-medium">Instructor: </span>
            <span className="text-black">
              {highlightText(`${course.instructor.firstName} ${course.instructor.lastName}`, searchTerm)}
            </span>
          </div>

          <div>
            <span className="text-black font-medium">Address: </span>
            <span className="text-black">{highlightText(course.address, searchTerm)}</span>
          </div>

          <div>
            <span className="text-black font-medium">Number of likes: </span>
            <span className="text-black">{course.studentsEnrolled.length}</span>
          </div>

          <div className="flex items-center space-x-6 mt-4">
            <div className="space-y-2">
              <button 
                onClick={(e)=>{
                  e.stopPropagation();
                  openWhatsApp(e);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
              >
                <FaWhatsapp size={20} />
              </button>
              <button 
                onClick={() => handleCopyToClipboard(course.contact)}
                className="w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-green-50 text-black hover:bg-green-100 transition-colors"
              >
                <FaCopy size={14} />
              </button>
            </div>

            <div className="space-y-2">
              <button 
                onClick={openEmailModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
              >
                <FaEnvelope size={20} />
              </button>
              <button 
                onClick={() => handleCopyToClipboard(course.instructor.email)}
                className="w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-green-50 text-black hover:bg-green-100 transition-colors"
              >
                <FaCopy size={14} />
              </button>
            </div>


          </div>
        </div>
      )}
    </div>

    {/* Admin Delete Button */}
    {user?.accountType === 'Admin' && (
      <button
        onClick={() => {
          setShowModal(true);
          setCourseToDelete(course);
        }}
        className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
      >
        <DeleteIcon />
      </button>
    )}

    {/* Save/Bookmark Button */}
    <button 
      onClick={handleSaveToggle}
      disabled={isLoading}
      className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-black hover:text-green-700 transition-colors"
    >
      {isLoading ? (
        <div className="animate-spin">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : isSaved ? (
        <FaBookmark className="text-green-700" size={20} />
      ) : (
        <FaRegBookmark size={20} />
      )}
    </button>

    <EmailConfirmationModal
        show={showEmailModal}
        onCancel={() => setShowEmailModal(false)}
        onConfirm={handleConfirmEmail}
      />
  </div>
  );
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

      setFilteredCourses(courses)
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

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
    <div className="container max-w-full p-9 bg-[#262629] min-h-full text-white">
      <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <Input 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow bg-zinc-800 text-white border-zinc-700 focus:border-blue-500"
        />
        <div className="flex space-x-4">
          <Button 
            onClick={handleSort}
            className="bg-blue-600 hover:bg-blue-700 transition"
          >
           {sortOrder === 'asc' ? 'Sort by Price' : 'Undo Sort by Price'}
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
              {hostelFilter ? 'My Hostel Courses' : 'Filter by My Hostel'}
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
          No courses found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete the course <strong>{courseToDelete?.courseName}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
