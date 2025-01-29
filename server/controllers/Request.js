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
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <img src="https://dummyimage.com/600x200/000/fff&text=Logo" alt="Company Logo" style="width: 100%; max-width: 300px;" />
          <h1>Hello, ${name}!</h1>
          <p>Thank you for reaching out to us. We have received your request with the following details:</p>
          <ul>
            <li><strong>Full Name:</strong> ${name}</li>
            <li><strong>Phone Number:</strong> ${phone}</li>
            <li><strong>Email:</strong> ${email}</li>
          </ul>
          <p>Our team will contact you shortly to address your inquiry or request. In the meantime, feel free to reply to this email if you have any additional questions.</p>
          <p>Best Regards,<br />The Support Team</p>
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
