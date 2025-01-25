

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaEnvelope, FaCopy } from 'react-icons/fa';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
// import { Copy, Mail, WhatsApp, Clock, Tag } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useSelector } from 'react-redux';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const Mail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const WhatsApp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.036 5.339c-3.684 0-6.656 2.911-6.656 6.5 0 1.726.685 3.295 1.810 4.449l-1.190 3.562 3.737-1.157c1.137.748 2.498 1.184 3.957 1.184 3.684 0 6.656-2.911 6.656-6.5s-2.972-6.5-6.656-6.5zm3.498 9.087c-.175.495-.977.964-1.323 1.046-.697.132-1.226.067-2.654-.569-2.201-.888-3.569-3.084-3.679-3.233-.109-.149-.888-1.177-.849-2.234.039-1.056.617-1.567.838-1.793.222-.226.487-.282.65-.282s.325.006.468.018c.156.013.365-.059.572.434.214.502.708 1.735.772 1.862.064.127.106.275.021.434-.085.159-.127.259-.254.398-.127.139-.268.312-.382.417-.127.112-.26.235-.112.461.148.226.662.974 1.417 1.662.975.865 1.762 1.152 2.007 1.281.246.128.39.106.536-.064.145-.171.617-.721.781-.97s.324-.213.544-.127c.221.085 1.407.662 1.653.784.246.121.41.183.471.285.061.102.061.582-.114 1.077z"/>
  </svg>
);

const Clock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

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

const CourseCard = ({ course, searchTerm, onDelete,deleteCourse,setShowModal, setCourseToDelete }) => {
  const { user } = useSelector((state) => state.profile);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(course.isSaved || false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy'));
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${course.contact}`, '_blank');
  };

  const openEmail = () => {
    window.open(`mailto:${course.instructor.email}`);
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

  const handleCopyContact = (text) => {
    try {
      navigator.clipboard.writeText(text)
        .then(() => toast.success('Copied to clipboard!'))
        .catch(() => toast.error('Failed to copy'));
    } catch (err) {
      toast.error('Copy failed');
    }
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
      <mark key={index} className="bg-yellow-200 text-black">{part}</mark> : part
    );
  };

 
  const renderTags = () => {
    const tagColors = [
      'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 
      'bg-sky-500', 'bg-blue-500', 'bg-indigo-500'
    ];
    
    return course.tag && course.tag.map((tag, index) => (
      <div 
        key={index} 
        className={`${tagColors[index % tagColors.length]} 
                    text-white px-2 py-1 rounded-full text-xs 
                    inline-block mr-2 mb-2 transform 
                    transition hover:scale-110`}
      >
        {tag}
      </div>
    ));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (confirmDelete) {
      onDelete(course._id);
    }
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };


  // Persist save state in localStorage
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
    setIsSaved(savedCourses.includes(course._id));
  }, [course._id]);

  const handleSaveToggle = async () => {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem('token'));
      
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/course/dolike`, 
        { courseId: course._id },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update saved courses in localStorage
      const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
      
      if (!isSaved) {
        // Save course
        const updatedSavedCourses = [...new Set([...savedCourses, course._id])];
        localStorage.setItem('savedCourses', JSON.stringify(updatedSavedCourses));
        setIsSaved(true);
        toast.success('Course saved successfully!', {
          style: {
            background: '#4B5563',
            color: 'white',
          },
          icon: '📚',
        });
      } else {
        // Unsave course
        const updatedSavedCourses = savedCourses.filter(id => id !== course._id);
        localStorage.setItem('savedCourses', JSON.stringify(updatedSavedCourses));
        setIsSaved(false);
        toast.error('Course unsaved', {
          style: {
            background: '#4B5563',
            color: 'white',
          },
          icon: '❌',
        });
      }
    } catch (error) {
      console.error('Save/Unsave failed:', error);
      toast.error('Failed to save/unsave course');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      
      className="cursor-pointer hover:bg-green-900/20 transition-all duration-300 
                 transform hover:scale-105 hover:shadow-2xl border border-green-800/50"
    >
      <Card className="w-full mb-4 bg-zinc-800 border-zinc-700">
      {user?.accountType === 'Admin' && (
  <button
    onClick={() => {
      setShowModal(true);
      setCourseToDelete(course);
    }}
    className="absolute bottom-4 right-4 p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-105 z-10"
    title="Delete Course"
  >
    <DeleteIcon/>
  
  </button>
                       )}

<div className="absolute bottom-4 left-4 z-10">
          <button 
            onClick={handleSaveToggle}
            disabled={isLoading}
            className="p-2 bg-zinc-900/50 rounded-full hover:bg-zinc-900/75 transition flex items-center justify-center"
            title={isSaved ? "Unsave Course" : "Save Course"}
          >
            {isLoading ? (
              <div className="animate-spin">
                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : isSaved ? (
              <FaBookmark className="text-blue-500 text-4xl" />
            ) : (
              <FaRegBookmark className="text-gray-300 text-4xl" />
            )}
          </button>
        </div>
      
        <CardHeader className="flex justify-between items-center bg-zinc-900">
          <div className="flex items-center space-x-2">
            <div>{highlightText(course.courseName, searchTerm)}</div>
            <div className="flex flex-wrap">{renderTags()}</div>
          </div>
          <div className="text-sm text-gray-400">
            {calculateTimeDifference(course.createdAt)}
          </div>
        </CardHeader>
        <CardContent className="flex">
          <img 
            src={course.thumbnail} 
            alt={course.courseName} 
            className="w-1/3 h-48 object-cover mr-4 rounded"
          />
          
          <div className="w-2/3">
            <div className="mb-2">
              <strong>Instructor:</strong> {highlightText(`${course.instructor.firstName} ${course.instructor.lastName}`, searchTerm)}
            </div>
            <div className="mb-2">
              <strong>Description:</strong> 
              {course.courseDescription.length > 100 ? (
                <>
                  {isDescriptionExpanded 
                    ? course.courseDescription 
                    : `${course.courseDescription.slice(0, 100)}...`}
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDescription();
                    }}
                    className="text-blue-500 cursor-pointer ml-2"
                  >
                    {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                  </span>
                </>
              ) : (
                course.courseDescription
              )}
            </div>
            <div className="mb-2">
              <strong>Address:</strong> {highlightText(course.address, searchTerm)}
            </div>
            <div className="mb-2">
              <strong>Price:</strong> ₹{highlightText(course.price.toLocaleString(), searchTerm)}
            </div>
            <div className="mb-2">
              <strong>Number of likes:</strong> {course.studentsEnrolled.length}
            </div>
            <div className="flex space-x-4 mt-2 items-center">
              {/* <div className="flex items-center">
                <a 
                  onClick={(e) => e.stopPropagation()}
                  href={`https://wa.me/${course.contact}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center mr-2"
                >
                  WhatsApp
                </a>
                <CopyIcon 
                  className="cursor-pointer text-gray-400 hover:text-white" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyContact(course.contact);
                  }}
                />
              </div>
              
              <div className="flex items-center">
                <a 
                  onClick={(e) => e.stopPropagation()}
                  href={`mailto:${course.instructor.email}`} 
                  className="flex items-center mr-2"
                >
                  Email
                </a>
                <CopyIcon 
                  className="cursor-pointer text-gray-400 hover:text-white" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyContact(course.instructor.email);
                  }}
                />
              </div> */}
            </div>
            <div className="flex space-x-2">
              <div>
              <button 
            onClick={openWhatsApp}
            className="text-green-500 hover:text-green-400 transition"
          >
            <FaWhatsapp size={24} />
          </button>
              </div>
          
          <div>
          <button 
            onClick={openEmail}
            className="text-blue-500 hover:text-blue-400 transition"
          >
            <FaEnvelope size={24} />
          </button>
          </div>
          
        </div>

        <div className=" mt-32 flex space-x-2">
          <div>
          <button 
            onClick={() => handleCopyToClipboard(course.contact)}
            className="text-gray-400 hover:text-white transition"
          >
            <FaCopy size={40} />
          </button>
          </div>
          <div>
          <button 
            onClick={() => handleCopyToClipboard(course.instructor.email)}
            className="text-gray-400 hover:text-white transition"
          >
            <FaCopy size={40} />
          </button>

          </div>
         
        </div>
        <div className=' mt-20'>

        <a href="mailto:example@example.com" onClick={(e) => e.preventDefault()}>
  <button onClick={() => handleCopyToClipboard('example@example.com')}>📋</button>
</a>

        </div>


            

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BuyPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [hostelFilter, setHostelFilter] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'latest', 'hostel'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const deleteCourse = async (courseId) => {
    console.log(courseId)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/course/deleteCourse`, {
        courseId: courseId,
      });
      console.log("------->",response)
  
      if (response.data.success) {
        toast.success('Course deleted successfully');
        // Update the state to reflect the deleted course
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

  const { user } = useSelector((state) => state.profile);
  // console.log("oooooooooo--------------->",user)
  const userHostel = user?.additionalDetails?.hostel;

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

// Reverse the coursesData array
const reversedCoursesData = [...coursesData].reverse();
                    console.log(coursesData);

        
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
      ['courseName', 'courseDescription', 'instructor.firstName', 'instructor.lastName', 'address', 'price','tag']
        .some(field => {
          const value = field.split('.').reduce((obj, key) => obj?.[key], course);
          return String(value).toLowerCase().includes(term);
        })
    );
    
    setFilteredCourses(filtered);
  };

  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  

  const handleSort = () => {
    const sorted = [...filteredCourses].sort((a, b) => 
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
    setFilteredCourses(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen animate-pulse">
      Loading...
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center mt-10">
      Error: {error}
    </div>
  );

  return (
    <div className="container mx-auto p-4 bg-zinc-900 min-h-screen text-white">
      <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <Input 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow bg-zinc-800 text-white border-zinc-700 
                     transition transform hover:scale-105 focus:scale-105 
                     focus:border-blue-500"
        />
        <div className="flex space-x-4">
          <Button 
            onClick={handleSort} 
            className="bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105"
          >
            Sort by Price {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
          {userHostel && (
            <Button 
              onClick={handleHostelFilter} 
              className={`transition transform hover:scale-105 ${
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
      
      {filteredCourses.length === 0 ? (
        <div className="text-center text-gray-400 animate-fade-in">
          No courses found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div>
              
                 <CourseCard 
              key={course._id} 
              course={course} 
              searchTerm={searchTerm}
              deleteCourse={(courseId) => {
                deleteCourse(courseId, setCourses, setFilteredCourses);
              
              }}
              setShowModal={setShowModal}
              setCourseToDelete={setCourseToDelete}
              className="transition transform hover:scale-105 hover:shadow-xl"
            />


             
            

        </div>

          ))}
        </div>
      )}




      {/* Confirmation Modal */}
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