const express = require("express");
const feedbackController = require("../controllers/Feedback");

const router = express.Router();

router.post("/submit", feedbackController.submitFeedback);

module.exports = router;