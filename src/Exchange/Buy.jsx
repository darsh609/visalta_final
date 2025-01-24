// import React from "react";
// import { motion } from "framer-motion";

// const BuyPage = () => {
//   const categories = ["Books", "Electronics", "Stationery", "Furniture", "Miscellaneous"];
//   const items = [
//     { id: 1, name: "Mathematics Book", price: "₹500", category: "Books", image: "https://via.placeholder.com/150" },
//     { id: 2, name: "Laptop", price: "₹45,000", category: "Electronics", image: "https://via.placeholder.com/150" },
//     { id: 3, name: "Study Table", price: "₹2,500", category: "Furniture", image: "https://via.placeholder.com/150" },
//     { id: 4, name: "Notebook Pack", price: "₹200", category: "Stationery", image: "https://via.placeholder.com/150" },
//     { id: 5, name: "Graphing Calculator", price: "₹1,200", category: "Electronics", image: "https://via.placeholder.com/150" },
//   ];

//   return (
//     <div className="bg-gray-900 text-white min-h-screen">
//       {/* Hero Section */}
//       <header className="py-10 text-center">
//         <motion.h1
//           className="text-4xl font-bold text-yellow-400"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Welcome to the Student Marketplace
//         </motion.h1>
//         <motion.p
//           className="text-gray-300 mt-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           Buy and sell items from fellow students!
//         </motion.p>
//         <motion.button
//           className="mt-6 bg-yellow-400 text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-300"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           Start Shopping
//         </motion.button>
//       </header>

//       {/* Search Bar */}
//       <div className="max-w-3xl mx-auto mt-10">
//         <motion.input
//           type="text"
//           placeholder="Search for items..."
//           className="w-full px-4 py-2 rounded-md text-gray-900"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1, duration: 0.6 }}
//         />
//       </div>

//       {/* Categories Section */}
//       <div className="max-w-7xl mx-auto mt-10 px-4">
//         <h2 className="text-2xl font-semibold text-yellow-400">Categories</h2>
//         <div className="flex flex-wrap gap-4 mt-6">
//           {categories.map((category, index) => (
//             <motion.div
//               key={index}
//               className="bg-gray-800 p-4 rounded-md text-center cursor-pointer hover:bg-gray-700 transition duration-300"
//               whileHover={{ scale: 1.1 }}
//             >
//               {category}
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Items Grid */}
//       <div className="max-w-7xl mx-auto mt-10 px-4">
//         <h2 className="text-2xl font-semibold text-yellow-400">Available Items</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {items.map((item) => (
//             <motion.div
//               key={item.id}
//               className="bg-gray-800 rounded-md overflow-hidden shadow-lg hover:shadow-yellow-400 transition duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-yellow-400">{item.name}</h3>
//                 <p className="text-gray-300">{item.price}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="mt-20 py-10 text-center border-t border-gray-700">
//         <p className="text-sm text-gray-400">
//           &copy; 2025 Student Marketplace. All Rights Reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default BuyPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// SVG Icons (same as previous implementation)
const WhatsappIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="green"
  >
    <path d="M12.036 5.339c-3.684 0-6.656 2.911-6.656 6.5 0 1.726.685 3.295 1.810 4.449l-1.190 3.562 3.737-1.157c1.137.748 2.498 1.184 3.957 1.184 3.684 0 6.656-2.911 6.656-6.5s-2.972-6.5-6.656-6.5zm3.498 9.087c-.175.495-.977.964-1.323 1.046-.697.132-1.226.067-2.654-.569-2.201-.888-3.569-3.084-3.679-3.233-.109-.149-.888-1.177-.849-2.234.039-1.056.617-1.567.838-1.793.222-.226.487-.282.65-.282s.325.006.468.018c.156.013.365-.059.572.434.214.502.708 1.735.772 1.862.064.127.106.275.021.434-.085.159-.127.259-.254.398-.127.139-.268.312-.382.417-.127.112-.26.235-.112.461.148.226.662.974 1.417 1.662.975.865 1.762 1.152 2.007 1.281.246.128.39.106.536-.064.145-.171.617-.721.781-.97s.324-.213.544-.127c.221.085 1.407.662 1.653.784.246.121.41.183.471.285.061.102.061.582-.114 1.077z"/>
  </svg>
);

const MailIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="blue"
  >
    <path d="M12 12.713l-11.987-9.713h23.974l-11.987 9.713zm0 2.817l-12-9.713v14.47h24v-14.47l-12 9.713z"/>
  </svg>
);

// Custom Components
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

const Card = ({ children, className }) => (
  <div className={`border rounded shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const CourseCard = ({ course, searchTerm }) => {
  const daysSincePosted = Math.floor(
    (new Date() - new Date(course.createdAt)) / (1000 * 60 * 60 * 24)
  );

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
      <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex justify-between items-center">
        <div>{highlightText(course.courseName, searchTerm)}</div>
        <div className="text-sm text-gray-500">
          {daysSincePosted} days ago
        </div>
      </CardHeader>
      <CardContent className="flex">
        <img 
          src={course.thumbnail} 
          alt={course.courseName} 
          className="w-1/3 h-48 object-cover mr-4"
        />
        
        <div className="w-2/3">
          <div className="mb-2">
            <strong>Instructor:</strong> {course.instructor.firstName} {course.instructor.lastName}
          </div>
          <div className="mb-2">
            <strong>Item-Description:</strong> {course.courseDescription}
          </div>
          <div className="mb-2">
            <strong>Address:</strong> {course.address}
          </div>
          <div className="mb-2">
            <strong>Price:</strong> ₹{course.price.toLocaleString()}
          </div>
          <div className="mb-2">
            <strong>Number of likes:</strong> {course.studentsEnrolled.length}
          </div>
          <div className="flex space-x-2 mt-2">
            <a 
              href={`https://wa.me/${course.contact}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <WhatsappIcon /> WhatsApp
            </a>
            
            <a 
              href={`mailto:${course.instructor.email}`} 
              className="flex items-center"
            >
              <MailIcon /> Email
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BuyPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        
        console.log("Full Response: ", response);
        console.log("Response Data: ", response.data);
  
        // Check different possible data structures
        const coursesData = response.data?.courses || 
                             response.data?.data || 
                             (Array.isArray(response.data) ? response.data : []);
        
        console.log("Processed Courses Data: ", coursesData);
        
        setCourses(coursesData);
        setFilteredCourses(coursesData);
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
      Object.values(course).some(value => 
        String(value).toLowerCase().includes(term)
      )
    );
    
    setFilteredCourses(filtered);
  };

  const handleSort = () => {
    const sorted = [...filteredCourses].sort((a, b) => 
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
    setFilteredCourses(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4 space-x-2">
        <Input 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow"
        />
        <Button onClick={handleSort}>
          Sort by Price {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
      </div>
      
      {filteredCourses.length === 0 ? (
        <div>No courses found</div>
      ) : (
        filteredCourses.map(course => (
          <CourseCard 
            key={course._id} 
            course={course} 
            searchTerm={searchTerm}
          />
        ))
      )}
    </div>
  );
};

export default BuyPage;