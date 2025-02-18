import React, { useState, useEffect } from 'react';
import { Star, Trash2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
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
  const isAdmin = user?.accountType === "Admin";
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const itemsPerPage = 3;

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

  const handleDeleteReview = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/review/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });

      const data = await response.json();

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
        fetchReviews();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
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
    const [isExpanded, setIsExpanded] = useState(false);
    const words = review.review.split(' ');
    const isLongReview = words.length > 4;
    const previewText = isLongReview ? words.slice(0, 4).join(' ') + '...' : review.review;

    useEffect(() => {
      if (typeof review.user === "object" && review?.user?._id) {
        fetchUserName(review.user._id).then((name) => setUserName(name));
      } else {
        setUserName("Unknown User");
      }
    }, [review.user]);

    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#49DE80]/20 to-zinc-800/10 rounded-xl blur-xl transform group-hover:scale-105 transition-transform duration-300" />
        <div className="relative bg-zinc-900/70 backdrop-blur-md rounded-xl p-6 border 
                      group-hover:border-[#49DE80] transition-all duration-300 h-full
                      shadow-md shadow-zinc-950/20 hover:shadow-[#49DE80]/50">
          {isAdmin && (
            <button
              onClick={() => {
                setSelectedReviewId(review._id);
                setIsModalOpen(true);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/50 hover:bg-red-500/20 
                       transition-colors duration-200"
              title="Delete Review"
            >
              <Trash2 className="w-5 h-5 text-white/70 hover:text-red-500" />
            </button>
          )}
          
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                  index < review.rating
                    ? 'text-[#49DE80] fill-[#49DE80]'
                    : 'text-zinc-700'
                }`}
              />
            ))}
          </div>
          
          <div className="mb-6">
            <p className="text-zinc-300 text-base leading-relaxed">
              {isExpanded ? review.review : previewText}
            </p>
            {isLongReview && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-[#49DE80] hover:text-[#49DE80]/80 text-sm flex items-center gap-1 transition-colors duration-200"
              >
                {isExpanded ? (
                  <>Show less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Show more <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
          
          <div className="border-t border-zinc-800/50 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#49DE80]/20 to-zinc-800/20 flex items-center justify-center">
                <span className="text-[#49DE80] font-medium">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-zinc-200">
                  {userName}
                </h3>
                <p className="text-zinc-800 text-sm">
                  {daysAgo} {daysAgo === 1 ? 'day' : 'days'} ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    <div className="w-full p-8 bg-white min-h-[00px] backdrop-blur-md rounded-3xl ">
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`grid gap-2 transition-all duration-300 ease-in-out
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