import React, { useState } from 'react';
import { Star, Send, Sparkles, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Ballpit from '../blocks/Backgrounds/Ballpit/Ballpit';

const MAX_CHARS = 300;

const RatingReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const handleReviewChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setReview(text);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log({ rating, review });
      setShowPopup(true);
      setRating(0);
      setReview('');
      setStep(1);
    } catch (error) {
      alert('Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" w-full flex items-center justify-center p-4 ">
     
      
     <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="rating-step"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-zinc-900/50 backdrop-blur-lg rounded-3xl p-8 border border-zinc-800 
                         md:p-10 sm:p-6"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-white flex items-center gap-2 
                                   md:text-4xl sm:text-2xl">
                        Rate Your Experience <Sparkles className="text-zinc-400" />
                      </h2>
                    </motion.div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-6 py-8 sm:py-4">
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
                                ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]'
                                : 'text-zinc-600'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-8 py-3 bg-zinc-800 text-white rounded-lg text-lg font-semibold 
                                   transition-all duration-200 hover:bg-yellow-500 hover:text-zinc-900
                                   shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500
                                   sm:px-6 sm:py-2 sm:text-base"
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
                className="bg-zinc-900/50 backdrop-blur-lg rounded-3xl p-8 border border-zinc-800
                         md:p-10 sm:p-6"
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between mb-6 sm:mb-4">
                      <h2 className="text-3xl font-bold text-white md:text-4xl sm:text-2xl">Share Your Thoughts</h2>
                      <div className="flex gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 sm:w-4 sm:h-4" />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-2">
                    <textarea
                      value={review}
                      onChange={handleReviewChange}
                      placeholder="Tell us what made your experience special..."
                      className="w-full min-h-[160px] px-4 py-3 text-lg rounded-lg bg-white/10 border border-zinc-700 
                               text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-500
                               focus:border-transparent resize-none transition-all duration-200
                               sm:min-h-[120px] sm:text-base"
                      required
                    />
                    <div className="flex justify-end">
                      <span className={`text-sm ${review.length >= MAX_CHARS ? 'text-red-400' : 'text-zinc-400'}`}>
                        {review.length}/{MAX_CHARS}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 sm:flex-col">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 bg-zinc-800 text-white rounded-lg
                               transition-all duration-200 hover:bg-yellow-500 hover:text-zinc-900
                               shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500
                               sm:py-2 sm:text-base sm:order-2"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !review.trim()}
                      className="flex-1 px-6 py-3 bg-zinc-800 text-white rounded-lg font-semibold 
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-200 hover:bg-yellow-500 hover:text-zinc-900
                               shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500
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

        {/* Success Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-zinc-800 text-white px-6 py-4 rounded-lg shadow-lg 
                       flex items-center gap-3 sm:bottom-4 sm:right-4 sm:left-4 sm:px-4"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>Thank you for your review!</span>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="p-1 hover:bg-zinc-700 rounded-full transition-colors"
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