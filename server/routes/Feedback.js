const express = require("express");


const router = express.Router();

const feedbackController = require("../controllers/Feedback");

// Route to submit feedback
router.post("/submit", feedbackController.submitFeedback);

// Route to get all feedback
router.get("/getfeedback", feedbackController.getFeedback);

// Route to delete a specific feedback by its ID
router.delete("/feedback/:id", feedbackController.deleteFeedback);

module.exports = router;