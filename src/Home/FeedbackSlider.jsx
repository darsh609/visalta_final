
//ashihs need to make the delete icon and modal look better in review slider
//make it like even when we r not hivering the icon of delte should come
import React, { useState, useEffect } from 'react';
import { Star, Trash2, AlertCircle } from 'lucide-react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, reviewId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-xl p-6 max-w-md w-full mx-4 border border-zinc-700 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-semibold text-white">Delete Review</h3>
        </div>
        
        <p className="text-zinc-300 mb-6">
          Are you sure you want to delete this review? This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 
                     transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reviewId)}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 
                     transition-colors duration-200 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedbackSlider = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("---->",user)
  const isAdmin = user?.accountType === "Admin";
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const itemsPerPage = 3;

  // Fetch reviews from backend
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/review/`);
      const data = await response.json();
      if (data.success) {
        setFeedbacks(data.data);
      } else {
        console.error("Failed to fetch reviews:", data.message);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle delete review
  const handleDeleteReview = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(id)
      
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/review/delete`, {
        method: 'POST',
        headers: {
          
          
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });

      const data = await response.json();
      console.log("----data-->",JSON.stringify({ id}))

      if (data.success) {
        toast.success('Review deleted successfully', {
          icon: '🗑️',
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            border: '1px solid #444',
          },
        });
        setIsModalOpen(false);
        // Refresh reviews
        fetchReviews();
      } else {
        throw new Error(data.message);
      }
    } 
    catch (error) {
      console.log("--------->",error.message)
      toast.error(error.message || 'Failed to delete review', {
        
        icon: '❌',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          border: '1px solid #444',
        },
      });
    }
  };

  // Your existing fetchUserName function remains the same
  const fetchUserName = async (userId) => {
    if (userNames[userId]) return userNames[userId];

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/review/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (data.success) {
        setUserNames((prev) => ({ ...prev, [userId]: data.user.name }));
        return data.user.name;
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
    return "Unknown User";
  };

  const ReviewCard = ({ review }) => {
    const daysAgo = moment().diff(moment(review.createdAt), 'days');
    const [userName, setUserName] = useState("Loading...");

    useEffect(() => {
      if (typeof review.user === "object" && review?.user?._id) {
        fetchUserName(review.user._id).then((name) => setUserName(name));
      } else {
        setUserName("Unknown User");
      }
    }, [review.user]);

    return (
      <div className="bg-zinc-800 rounded-xl shadow-2xl p-8 flex flex-col h-full border border-zinc-700 
                      hover:border-zinc-500 transition-all duration-300 ease-in-out transform 
                      hover:-translate-y-2 hover:shadow-xl
                      group relative overflow-hidden">
        {/* Admin Delete Button */}

        {isAdmin && (
          <button
            onClick={() => {
              setSelectedReviewId(review._id);
              setIsModalOpen(true);
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-700/50 hover:bg-red-500/50 
                     transition-colors duration-200 opacity-0 group-hover:opacity-100"
            title="Delete Review"
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        )}
        
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-6 h-6 transform transition-transform duration-300 group-hover:scale-110 ${
                index < review.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-zinc-600'
              }`}
            />
          ))}
        </div>
        
        <p className="text-zinc-300 text-base mb-6 flex-grow italic leading-relaxed">
          "{review.review}"
        </p>
        
        <div className="mt-auto border-t border-zinc-700 pt-4">
          <h3 className="font-semibold text-base text-zinc-200 mb-1">
            {userName}
          </h3>
          <p className="text-zinc-400 text-sm">
            {daysAgo} {daysAgo === 1 ? 'day' : 'days'} ago
          </p>
        </div>
      </div>
    );
  };

  // Your existing pagination and animation logic
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, totalPages]);

  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return feedbacks.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="w-full p-8 bg-zinc-900 min-h-[400px] shadow-2xl border border-zinc-800">
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`grid gap-6 transition-all duration-300 ease-in-out
                        lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1
                        ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          {getCurrentPageItems().map((feedback) => (
            <ReviewCard key={feedback._id} review={feedback} />
          ))}
        </div>

        {/* <div className="flex justify-center mt-10 gap-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125
                         ${currentPage === index 
                           ? 'bg-blue-500 hover:bg-blue-400' 
                           : 'bg-zinc-600 hover:bg-zinc-500'}`}
            />
          ))}
        </div> */}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReviewId(null);
        }}
        onConfirm={handleDeleteReview}
        reviewId={selectedReviewId}
      />
    </div>
  );
};

export default FeedbackSlider;