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
        <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #1a1a1a; padding: 40px 20px; max-width: 600px; margin: 0 auto; color: #ffffff; border: 1px solid #333333; border-radius: 8px; background-color: #232323;">
    <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://i.postimg.cc/dQb3HqdF/Visalta.jpg" alt="Visalta Logo" style="max-width: 200px; padding: 20px; background-color: #ffffff; border-radius: 10px;" />
    </div>
    
    <div style="text-align: center; font-size: 28px; font-weight: bold; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px; padding: 10px 0; color: #ffffff; background-color: #1c2a1f; border-bottom: 3px solid #4ade80;">
        Feedback Received 🎯
    </div>
    
    <div style="padding: 0 20px;">
        <h1 style="color: #4ade80; margin-bottom: 20px;">Thank you for your valuable feedback, ${name}! ✨</h1>
        
        <div style="background-color: #1c2a1f; padding: 25px; margin: 25px 0; border-left: 3px solid #4ade80; border-radius: 0 8px 8px 0;">
            <div style="margin: 12px 0; padding-bottom: 8px; border-bottom: 1px solid #333333;">
                <span style="color: #4ade80; font-weight: bold; margin-right: 10px;">Category:</span>
                <span style="color: #ffffff;">${category}</span>
            </div>
            <div style="margin: 12px 0;">
                <span style="color: #4ade80; font-weight: bold; margin-right: 10px;">Impact Level:</span>
                <span style="color: #ffffff;">${impactLevel}</span>
            </div>
        </div>
        
        <div style="background-color: #1c2a1f; padding: 20px; margin: 25px 0; border: 1px solid #4ade80; border-radius: 8px;">
            <div style="color: #4ade80; font-weight: bold; margin-bottom: 10px;">Your Suggestion:</div>
            <div style="color: #ffffff; border-left: 4px solid #4ade80; padding-left: 15px; margin: 10px 0;">
                ${suggestion}
            </div>
        </div>
        
        <div style="background-color: #1c2a1f; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0; border: 1px solid #4ade80;">
            <span style="color: #ffffff;">📋 Our team will carefully review your feedback and take appropriate actions</span>
        </div>
        
        <p style="color: #ffffff; margin-bottom: 20px;">Your input helps us improve and provide better services. We truly value your time and effort in sharing your thoughts with us.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333333; text-align: center;">
            <p style="color: #ffffff; margin-bottom: 10px;">Want to share more feedback? Contact us at<br/>
            <a href="mailto:teamvisalta@gmail.com" style="color: #4ade80; text-decoration: underline;">teamvisalta@gmail.com</a></p>
            
            <p style="color: #ffffff; margin-top: 20px; font-size: 14px;">
                Best Regards,<br />
                The Visalta Team
            </p>
        </div>
    </div>
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