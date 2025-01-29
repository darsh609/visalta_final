const RatingAndReview = require("../models/RatingAndRaview");

// Create a new rating and review
exports.createRatingAndReview = async (req, res) => {
  try {
    const { rating, review } = req.body;

    // Fetch user ID from req.user (assuming it's set by an auth middleware)
    const userId = req.user.id;

    // Validate input
    if (!rating || !review) {
      return res.status(400).json({ success: false, message: "Rating and review are required" });
    }

    // Create a new rating and review
    const newRatingAndReview = await RatingAndReview.create({ user: userId, rating, review });

    res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      data: newRatingAndReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create rating and review", error: error.message });
  }
};

// Get all ratings and reviews
exports.getAllRatingsAndReviews = async (req, res) => {
  try {
    const reviews = await RatingAndReview.find().populate("user", "name email");
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch ratings and reviews", error: error.message });
  }
};

// Get a single rating and review by ID
// exports.getRatingAndReviewById = async (req, res) => {
//   try {
//     const { id } = req.body; // ID from the body

//     const review = await RatingAndReview.findById(id).populate("user", "name email");
//     if (!review) {
//       return res.status(404).json({ success: false, message: "Review not found" });
//     }

//     res.status(200).json({ success: true, data: review });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch review", error: error.message });
//   }
// };

// Delete a rating and review
exports.deleteRatingAndReview = async (req, res) => {
  try {
    const { id } = req.body; // ID from the body

    const deletedReview = await RatingAndReview.findByIdAndDelete(id);
    if (!deletedReview) {
      ///
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete review", error: error.message });
  }
};
