import React, { useState } from 'react';
import { Star, Send, Sparkles, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Feedback from '../assets/FEEDBACK.png';

const MAX_CHARS = 300;

const RatingReviewForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleReviewChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setReview(text);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to submit a review", {
        icon: '🔐',
        duration: 3000,
        style: {
          background: '#fff',
          color: '#333',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        },
      });
      navigate("/login");
      return;
    }

    const loadingToast = toast.loading("Submitting your review...", {
      style: {
        background: '#fff',
        color: '#333',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
      },
    });

    setIsSubmitting(true);

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const data = {
        rating: Number(rating),
        review: review.trim(),
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/review/create`,
        data,
        config
      );

      if (response.data.success) {
        toast.dismiss(loadingToast);
        toast.success("Thank you! Your review has been submitted.", {
          icon: '⭐',
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
          },
        });

        setRating(0);
        setReview('');
        setStep(1);
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.dismiss(loadingToast);
      
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please login again.", {
            icon: '⚠️',
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
            },
          });
          localStorage.removeItem("token");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          toast.error(error.response.data.message || "Failed to submit review", {
            icon: '❌',
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
            },
          });
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          icon: '🌐',
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
          },
        });
      } else {
        toast.error(error.message || "Something went wrong", {
          icon: '❌',
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
          },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="rating-step"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100
                         md:p-10 sm:p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="relative h-full flex items-center justify-center overflow-hidden rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={Feedback} 
                      alt="Feedback illustration"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 "></div>
                  </motion.div>

                  <div className="flex flex-col justify-between space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="text-3xl font-bold text-gray-800 flex items-center 
                                   md:text-4xl sm:text-xl">
                        Rate Your Experience 
                      </div>
                    </motion.div>
                    
                    <div className="flex flex-col items-center gap-6 py-4">
                      <div className="flex gap-3 sm:gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="focus:outline-none"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                          >
                            <Star
                              className={`w-12 h-12 transition-all duration-300 sm:w-8 sm:h-8 ${
                                star <= (hoveredRating || rating)
                                  ? 'fill-green-400 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]'
                                  : 'text-gray-200'
                              }`}
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {rating > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center"
                      >
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-8 py-3 bg-green-400 text-white rounded-xl text-lg font-semibold 
                                   transition-all duration-200 hover:bg-green-500
                                   shadow-lg shadow-green-400/20 transform hover:scale-105 
                                   focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                                   sm:px-6 sm:py-2 sm:text-base w-full"
                        >
                          Continue
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="review-step"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100
                         md:p-10 sm:p-6"
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between mb-6 sm:mb-4">
                      <h2 className="text-3xl font-bold text-gray-800 md:text-4xl sm:text-2xl">Share Your Thoughts</h2>
                      <div className="flex gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-green-400 text-green-400 sm:w-4 sm:h-4" />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-2">
                    <textarea
                      value={review}
                      onChange={handleReviewChange}
                      placeholder="Tell us what made your experience special..."
                      className="w-full min-h-[160px] px-4 py-3 text-lg rounded-xl bg-gray-50 
                               text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                               focus:ring-green-400 focus:ring-offset-2 border border-gray-200
                               hover:border-green-400 transition-all duration-200
                               sm:min-h-[120px] sm:text-base"
                      required
                    />
                    <div className="flex justify-end">
                      <span className={`text-sm ${review.length >= MAX_CHARS ? 'text-red-400' : 'text-gray-400'}`}>
                        {review.length}/{MAX_CHARS}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 sm:flex-col">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl
                               transition-all duration-200 hover:bg-gray-200
                               shadow-lg transform hover:scale-105 focus:outline-none 
                               focus:ring-2 focus:ring-gray-200 focus:ring-offset-2
                               sm:py-2 sm:text-base sm:order-2"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !review.trim()}
                      className="flex-1 px-6 py-3 bg-green-400 text-white rounded-xl font-semibold 
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-200 hover:bg-green-500
                               shadow-lg shadow-green-400/20 transform hover:scale-105 
                               focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                               flex items-center justify-center gap-2
                               sm:py-2 sm:text-base sm:order-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          Submit Review <Send className="w-5 h-5 sm:w-4 sm:h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-white text-gray-800 px-6 py-4 rounded-xl 
                       shadow-lg shadow-green-400/10 border border-gray-100
                       flex items-center gap-3 sm:bottom-4 sm:right-4 sm:left-4 sm:px-4"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-400" />
                <span>Thank you for your review!</span>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RatingReviewForm;