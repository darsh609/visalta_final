import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPhoneAlt, FaEnvelope, FaCopy } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
// Assuming you have a Card component
const Card = ({ children, className }) => (
    <div className={`border rounded shadow-md p-4 bg-zinc-800 ${className}`}>
      {children}
    </div>
  );
const Mycourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log("Courses", response); 

        setCourses(response.data.data || []); 
   // Set courses from response
        // Set courses from response
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
    <div className="bg-zinc-900 min-h-screen p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-center text-white mb-8">My Courses</h1>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading courses...</p>
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} onRemove={() => handleRemove(course._id)} />
          ))
        ) : (
          <p className="text-center text-gray-400">No courses found.</p>
        )}
      </div>
    </div>
  );
};

const CourseCard = ({ course, onRemove }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleCopyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy."));
  };

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

  return (
    <Card className="p-4">
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
      <img
        src={course.thumbnail}
        alt={course.courseName}
        className="w-full h-48 object-cover rounded my-2"
      />
      <h2 className="text-lg font-semibold text-white">{course.courseName}</h2>
      <p className="text-sm text-gray-400 mt-2">{course.courseDescription}</p>
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
      <div className="flex space-x-4 mt-4">
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
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.open(`mailto:${course.instructor}`, "_blank")}
            className="text-blue-500 hover:text-blue-400 transition"
            title="Send Email"
          >
            <FaEnvelope size={20} />
          </button>
          <button
            onClick={() => handleCopyToClipboard(course.instructor)}
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

export default Mycourse;
