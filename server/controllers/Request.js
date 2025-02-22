const Request = require("../models/Request");
const mailSender = require("../utils/mailSender");

const requestController = {
  submitRequest: async (req, res) => {
    try {
      const { name, phone, email } = req.body;

      // Validation
      if (!name || !phone || !email) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Save request to database
      const newRequest = new Request({
        name,
        phone,
        email,
      });
      await newRequest.save();

      // Send response mail
      const title = "Thank you for your request!";
      const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #1a1a1a; padding: 40px 20px; max-width: 600px; margin: 0 auto; color: #ffffff; border: 1px solid #333333; border-radius: 8px; background-color: #232323;">
    <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://iili.io/3H2mdI1.jpg" alt="Visalta Logo" style="max-width: 200px; padding: 20px; background-color: #ffffff; border-radius: 10px;" />
    </div>
    
    <div style="text-align: center; font-size: 28px; font-weight: bold; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px; padding: 10px 0; color: #ffffff; background-color: #1c2a1f; border-bottom: 3px solid #4ade80;">
        Request Received
    </div>
    
    <div style="padding: 0 20px;">
        <h1 style="color: #4ade80; margin-bottom: 20px;">Hello, ${name}! 👋</h1>
        
        <p style="color: #ffffff; margin-bottom: 20px;">Thank you for reaching out to us. We've received your request and are excited to assist you. Here are the details you provided:</p>
        
        <div style="background-color: #1c2a1f; padding: 25px; margin: 25px 0; border-left: 3px solid #4ade80; border-radius: 0 8px 8px 0;">
            <div style="margin: 12px 0; padding-bottom: 8px; border-bottom: 1px solid #333333;">
                <span style="color: #4ade80; font-weight: bold; margin-right: 10px;">Full Name:</span>
                <span style="color: #ffffff;">${name}</span>
            </div>
            <div style="margin: 12px 0; padding-bottom: 8px; border-bottom: 1px solid #333333;">
                <span style="color: #4ade80; font-weight: bold; margin-right: 10px;">Phone Number:</span>
                <span style="color: #ffffff;">${phone}</span>
            </div>
            <div style="margin: 12px 0;">
                <span style="color: #4ade80; font-weight: bold; margin-right: 10px;">Email:</span>
                <span style="color: #ffffff;">${email}</span>
            </div>
        </div>
        
        <div style="background-color: #1c2a1f; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0; border: 1px solid #4ade80;">
            <span style="color: #ffffff;">⏱️ We typically respond within 24-48 hours</span>
        </div>
        
        <p style="color: #ffffff; margin-bottom: 20px;">Our team will contact you shortly to address your inquiry. Feel free to reply to this email if you have any additional questions or concerns.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333333; text-align: center;">
            <p style="color: #ffffff; margin-bottom: 10px;">Need immediate assistance? Contact us at<br/>
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

      res.status(200).json({ message: "Request submitted successfully!" });
    } catch (error) {
      console.error("Error submitting request:", error);
      res.status(500).json({ error: "An error occurred while submitting the request." });
    }
  },
};

module.exports = requestController;
