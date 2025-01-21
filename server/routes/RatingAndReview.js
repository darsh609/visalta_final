// const express = require("express");
// const {
//   createRatingAndReview,
//   getAllRatingsAndReviews,
//   getRatingAndReviewById,
//   deleteRatingAndReview,
// } = require("../controllers/RatingAndReview");


const express = require("express");
const {
  createRatingAndReview,
  getAllRatingsAndReviews,
  deleteRatingAndReview,
} = require("../controllers/RatingAndReview");
const { auth, isStudent, isAdmin } = require("../middlewares/auth")
// const authMiddleware = require("../middleware/authMiddleware"); // Assuming there's an auth middleware

const router = express.Router();

// Routes
router.post("/create", auth, createRatingAndReview); // Create a new review
router.get("/", getAllRatingsAndReviews); // Get all reviews
// router.post("/get", auth, getRatingAndReviewById); // Get a review by ID (from body)
router.post("/delete",auth,isAdmin, deleteRatingAndReview); // Delete a review (from body)



const { getUserById } = require("../controllers/userController");
router.post("/getUser", getUserById);
module.exports = router;
