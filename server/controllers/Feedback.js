const Feedback = require("../models/Feedback");
const mailSender = require("../utils/mailSender");

const feedbackController = {
  submitFeedback: async (req, res) => {
    try {
      const { name, email, category, impactLevel, suggestion } = req.body;

      // Validation
      if (!name || !email || !category || !impactLevel || !suggestion) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Save feedback to database
      const newFeedback = new Feedback({
        name,
        email,
        category,
        impactLevel,
        suggestion,
      });
      await newFeedback.save();

      console.log(newFeedback)

      // Send response mail
      const title = "Thank you for your feedback!";
      const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <img src="https://dummyimage.com/600x200/000/fff&text=Logo" alt="Company Logo" style="width: 100%; max-width: 300px;" />
          <h1>Thank you, ${name}!</h1>
          <p>We have received your feedback in the category <strong>${category}</strong> with an impact level of <strong>${impactLevel}</strong>.</p>
          <p>Your suggestion:</p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; margin-left: 0; color: #555;">${suggestion}</blockquote>
          <p>Our team will review your feedback and take necessary actions to improve your experience.</p>
          <p>Best Regards,<br />The Team</p>
        </div>
      `;

      await mailSender(email, title, body);

      res.status(200).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ error: "An error occurred while submitting feedback." });
    }
  },
};

module.exports = feedbackController;