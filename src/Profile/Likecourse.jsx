// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { motion } from "framer-motion";
// // import { FaBookmark, FaRegBookmark } from "react-icons/fa";

// // // Simple Card component
// // const Card = ({ children, className }) => (
// //   <div className={`border rounded shadow-md p-4 bg-zinc-800 ${className}`}>
// //     {children}
// //   </div>
// // );

// // const Likecourse = () => {
// //   const [likedCourses, setLikedCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchLikedCourses = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem("token"));
// //         const response = await axios.get(
// //           `${process.env.REACT_APP_BASE_URL}/course/getalllike`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               "Content-Type": "application/json",
// //             },
// //           }
// //         );
// //         setLikedCourses(response.data.likedCourses || []);
// //       } catch (error) {
// //         console.error("Failed to fetch liked courses:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchLikedCourses();
// //   }, []);

// //   return (
// //     <div className="bg-zinc-900 min-h-screen p-4">
// //       {/* Page Heading */}
// //       <motion.h1
// //         className="text-3xl font-bold text-center text-white mb-8"
// //         initial={{ opacity: 0, y: -20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //       >
// //         Liked Courses
// //       </motion.h1>

// //       {/* Courses List */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {loading ? (
// //           <p className="text-center text-gray-400">Loading liked courses...</p>
// //         ) : likedCourses.length > 0 ? (
// //           likedCourses.map((course) => (
// //             <CourseCard key={course._id} course={course} />
// //           ))
// //         ) : (
// //           <p className="text-center text-gray-400">No liked courses found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const CourseCard = ({ course }) => {
// //   const [isSaved, setIsSaved] = useState(true); // Initially saved as per the response
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSaveToggle = async () => {
// //     try {
// //       setIsLoading(true);
// //       const token = JSON.parse(localStorage.getItem("token"));

// //       await axios.post(
// //         `${process.env.REACT_APP_BASE_URL}/course/dolike`,
// //         { courseId: course._id },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       // Toggle saved state
// //       setIsSaved(!isSaved);
// //     } catch (error) {
// //       console.error("Failed to toggle save state:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <Card className="p-4">
// //       <div className="flex justify-between items-start">
// //         <h2 className="text-lg font-semibold text-white">{course.courseName}</h2>
// //         <button
// //           onClick={handleSaveToggle}
// //           disabled={isLoading}
// //           className="p-2 rounded-full transition transform hover:scale-110"
// //           title={isSaved ? "Unsave Course" : "Save Course"}
// //         >
// //           {isLoading ? (
// //             <div className="animate-spin">
// //               <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24">
// //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                 <path
// //                   className="opacity-75"
// //                   fill="currentColor"
// //                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //                 ></path>
// //               </svg>
// //             </div>
// //           ) : isSaved ? (
// //             <FaBookmark className="text-blue-500" size={24} />
// //           ) : (
// //             <FaRegBookmark className="text-gray-300" size={24} />
// //           )}
// //         </button>
// //       </div>
// //       <p className="text-sm text-gray-400 mt-2">{course.courseDescription}</p>
// //       <p className="text-sm text-green-400 mt-2">
// //         Instructor: {course.instructor}
// //       </p>
// //       <p className="text-sm text-yellow-400 mt-2">Address: {course.address}</p>
// //     </Card>
// //   );
// // };

// // export default Likecourse;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa";

// // Simple Card component
// const Card = ({ children, className }) => (
//   <div className={`border rounded shadow-md p-4 bg-zinc-800 ${className}`}>
//     {children}
//   </div>
// );

// const Likecourse = () => {
//   const [likedCourses, setLikedCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLikedCourses = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem("token"));
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/course/getalllike`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setLikedCourses(response.data.likedCourses || []);
//       } catch (error) {
//         console.error("Failed to fetch liked courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLikedCourses();
//   }, []);

//   return (
//     <div className="bg-zinc-900 min-h-screen p-4">
//       {/* Page Heading */}
//       <motion.h1
//         className="text-3xl font-bold text-center text-white mb-8"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Liked Courses
//       </motion.h1>

//       {/* Courses List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {loading ? (
//           <p className="text-center text-gray-400">Loading liked courses...</p>
//         ) : likedCourses.length > 0 ? (
//           likedCourses.map((course) => (
//             <CourseCard key={course._id} course={course} />
//           ))
//         ) : (
//           <p className="text-center text-gray-400">No liked courses found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const CourseCard = ({ course }) => {
//   const [isSaved, setIsSaved] = useState(true); // Initially saved
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to calculate time difference
//   const calculateTimeDifference = (createdAt) => {
//     const now = new Date();
//     const created = new Date(createdAt);
//     const diffInMilliseconds = now - created;
//     const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

//     if (diffInDays === 0) return "Today";
//     return `${diffInDays} days ago`;
//   };

//   const handleSaveToggle = async () => {
//     try {
//       setIsLoading(true);
//       // Logic to toggle save (will be provided later)
//       setIsSaved(!isSaved);
//     } catch (error) {
//       console.error("Failed to toggle save state:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="p-4">
//       <div className="flex justify-between items-start">
//         <h2 className="text-lg font-semibold text-white">{course.courseName}</h2>
//         <button
//           onClick={handleSaveToggle}
//           disabled={isLoading}
//           className="p-2 rounded-full transition transform hover:scale-110"
//           title={isSaved ? "Unsave Course" : "Save Course"}
//         >
//           {isLoading ? (
//             <div className="animate-spin">
//               <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//             </div>
//           ) : isSaved ? (
//             <FaBookmark className="text-blue-500" size={24} />
//           ) : (
//             <FaRegBookmark className="text-gray-300" size={24} />
//           )}
//         </button>
//       </div>
//       <img
//         src={course.thumbnail}
//         alt={course.courseName}
//         className="w-full h-48 object-cover rounded my-2"
//       />
//       <p className="text-sm text-gray-400 mt-2">{course.courseDescription}</p>
//       <p className="text-sm text-green-400 mt-2">
//         Instructor: {`${course.instructor.firstName} ${course.instructor.lastName}`}
//       </p>
//       <p className="text-sm text-yellow-400 mt-2">Address: {course.address}</p>
//       <p className="text-sm text-purple-400 mt-2">
//         Price: ₹{course.price.toLocaleString()}
//       </p>
//       <p className="text-sm text-gray-400 mt-2">
//         Number of Students Enrolled: {course.studentsEnrolled.length}
//       </p>
//       <p className="text-sm text-gray-500 mt-2">
//         Created: {calculateTimeDifference(course.createdAt)}
//       </p>
//     </Card>
//   );
// };

// export default Likecourse;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaBookmark, FaRegBookmark, FaEnvelope, FaCopy, FaPhoneAlt } from "react-icons/fa";

// Simple Card component


const Card = ({ children, className }) => (
  <div className={`border rounded shadow-md p-4 bg-zinc-800 ${className}`}>
    {children}
  </div>
);

const Likecourse = () => {
  const [likedCourses, setLikedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedCourses = async () => {
      try {
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

        console.log("API Response:", response); // Log the raw response
        setLikedCourses(response.data.likedCourses);
        console.log("likedCourses------------------------------>",likedCourses)
      } catch (error) {
        console.error("Failed to fetch liked courses:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedCourses();
  }, []);

  useEffect(() => {
    console.log("Updated likedCourses:", likedCourses); // Logs whenever likedCourses changes
  }, [likedCourses]);

  // useEffect(() => {  
  //   const savedCourses = JSON.parse(localStorage.getItem("savedCourses") || "[]");
  //   setLikedCourses((prev) => prev.filter((course) => savedCourses.includes(course._id)));
  //   console.log("likedcourse------------------------------>",likedCourses)  

  //  }, [likedCourses]); 
  

  const handleRemoveFromList = (courseId) => {
    setLikedCourses((prev) => prev.filter((course) => course._id !== courseId));
  };
  return (
    <div className="bg-zinc-900 min-h-screen p-4">
      {/* Page Heading */}
  
      <motion.h1
        className="text-3xl font-bold text-center text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Liked Courses
      </motion.h1>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading liked courses...</p>
        ) : likedCourses?.length > 0 ? (
          likedCourses?.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onRemove={() => handleRemoveFromList(course._id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">No liked courses found.</p>
        )}
      </div>
    </div>
  );
};

const CourseCard = ({ course,onRemove }) => {
    const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(true); // Initially saved
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const savedCourses = JSON.parse(localStorage.getItem("savedCourses") || "[]");
  //   if (!savedCourses.includes(course._id)) {
  //     onRemove(); // Remove from UI if not saved
  //   }
  // }, [course._id, onRemove]);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));

      // API request to delete the course
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

      toast.success("Course deleted successfully!", {
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


  // Function to calculate time difference
  const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMilliseconds = now - created;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${diffInDays} days ago`;
  };

//   const handleSaveToggle = async () => {
//     try {
//       setIsLoading(true);
//       // Logic to toggle save (will be provided later)
//       setIsSaved(!isSaved);
//     } catch (error) {
//       console.error("Failed to toggle save state:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

const handleCopyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy."));
  };

  return (
    <Card className="p-4">
      {/* Header with Tags */}
   
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap">
          {course.tag.map((tag, index) => (
            <span
              key={index}
              className="bg-green-600 text-white px-2 py-1 rounded-full text-xs mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 rounded-full transition transform hover:scale-110"
          title="Delete Course"
        >
          <FaTrash className="text-red-500" size={24} />
        </button>
      </div>
      {/* Course Details */}
      <img
        src={course.thumbnail}
        alt={course.courseName}
        className="w-full h-48 object-cover rounded my-2"
      />
      <h2 className="text-lg font-semibold text-white">{course.courseName}</h2>
      <p className="text-sm text-gray-400 mt-2">{course.courseDescription}</p>
      <p className="text-sm text-green-400 mt-2">
        Instructor: {`${course.instructor.firstName} ${course.instructor.lastName}`}
      </p>
      <p className="text-sm text-yellow-400 mt-2">Address: {course.address}</p>
      <p className="text-sm text-purple-400 mt-2">
        Price: ₹{course.price.toLocaleString()}
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Number of Students Enrolled: {course.studentsEnrolled.length}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Created: {calculateTimeDifference(course.createdAt)}
      </p>
      {/* Contact Details */}
      <div className="flex space-x-4 mt-4">
  {/* WhatsApp */}
  <div className="flex items-center space-x-2">
    <button
      onClick={() => window.open(`https://wa.me/${course.contact}`, "_blank")}
      className="text-green-500 hover:text-green-400 transition"
      title="Open WhatsApp"
    >
      <FaPhoneAlt size={20} />
    </button>
    <button
      onClick={() => handleCopyToClipboard(course.contact)}
      className="text-gray-400 hover:text-white transition"
      title="Copy WhatsApp Number"
    >
      <FaCopy size={20} />
    </button>
  </div>
  
  {/* Email */}
  <div className="flex items-center space-x-2">
    <button
      onClick={() => window.open(`mailto:${course.instructor.email}`, "_blank")}
      className="text-blue-500 hover:text-blue-400 transition"
      title="Send Email"
    >
      <FaEnvelope size={20} />
    </button>
    <button
      onClick={() => handleCopyToClipboard(course.instructor.email)}
      className="text-gray-400 hover:text-white transition"
      title="Copy Email Address"
    >
      <FaCopy size={20} />
    </button>
  </div>
</div>


{showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-zinc-900 p-6 rounded-lg shadow-lg text-white">
            <p className="mb-4">Are you sure you want to delete this course?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Yes"}
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

    </Card>
  );
};

export default Likecourse;
