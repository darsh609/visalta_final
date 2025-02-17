const Update = require("../models/Update");

// Get all updates
exports.getAllUpdates = async (req, res) => {
  try {
    const updates = await Update.find().sort({ date: -1 });
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ error: "Error fetching updates" });
  }
};

const mailSender = require("../utils/mailSender");
const User = require("../models/User"); // Importing the User schema
// const Update = require("../models/update"); // Assuming you have an Update model

exports.createUpdate = async (req, res) => {
  try {
    const { title, description, date, createdBy, link } = req.body;
    
    // Create a new update
    const newUpdate = new Update({ title, description, date, createdBy, link });
    await newUpdate.save();
    
    // Fetch all user emails from the database
    const users = await User.find({}, "email firstName");
    
    // Email content
    const emailSubject = "🚀 Important Alert: New Timely Alert and Posts (TAPs) Update!";
    
    for (const user of users) {
      const emailBody = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>New TAPs Update</title>
          <style>
              body {
                  background-color: #1a1a1a;
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #ffffff !important;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 40px 20px;
                  background-color: #232323;
                  border: 1px solid #333333;
              }
              .logo {
                  max-width: 200px;
                  margin-bottom: 30px;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
              }
              .highlight {
                  color: #4ade80;
                  font-weight: bold;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  color: #ffffff;
                  background-color: #4ade80;
                  text-decoration: none;
                  font-weight: bold;
                  border-radius: 5px;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div style="text-align: center;">
                  <img class="logo" src="https://i.postimg.cc/25V8F6Nh/Visalta.jpg" alt="Platform Logo" />
              </div>
      
              <div style="color: #ffffff; text-align: center; font-size: 28px; font-weight: bold; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px; padding: 10px 0; background-color: #1c2a1f; border-bottom: 3px solid #4ade80;">
                  Important Alert: Timely Alert and Posts (TAPs) Update! 🚀
              </div>
      
              <div style="padding: 20px;">
                  <p style="font-size: 18px; color: #ffffff;">
                      Hello ${user.firstName},
                  </p>
                  
                  <p style="font-size: 18px; color: #ffffff;">
                      A new TAPs (Timely Alerts and Posts) update has been added:
                  </p>
                  <ul style="color: #ffffff; font-size: 16px;">
                      <li><strong>Title:</strong> ${title}</li>
                      <li><strong>Description:</strong> ${description}</li>
                      <li><strong>Date:</strong> ${date}</li>
                      <li><strong>Link:</strong> <a href="${link}" style="color: #4ade80;">Click here to view</a></li>
                  </ul>
                  
                  <div style="text-align: center;">
                      <a class="button" href="https://visalta-final-qg3f.vercel.app/update" target="_blank">Visit Our Website</a>
                  </div>
      
                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333333; text-align: center; color: #ffffff;">
                      <p>Stay tuned for more updates!</p>
                      <p style="margin-top: 15px; font-size: 14px;">
                          Best regards,<br>
                          The Visalta Team
                      </p>
                  </div>
              </div>
          </div>
      </body>
      </html>
      `;
      
      // Send the email
      await mailSender(user.email, emailSubject, emailBody);
    }
    
    res.status(201).json({ message: "Update created and email notifications sent", newUpdate });
  } catch (error) {
    res.status(500).json({ error: "Error creating update or sending emails" });
  }
};


// Delete an update


// Delete an update (ID passed in body)
exports.deleteUpdate = async (req, res) => {
  try {
    const { id } = req.body; // ID is extracted from the request body
    if (!id) {
      return res.status(400).json({ error: "ID is required to delete an update." });
    }
    const deletedUpdate = await Update.findByIdAndDelete(id);
    if (!deletedUpdate) {
      return res.status(404).json({ error: "Update not found." });
    }
    res.status(200).json({ message: "Update deleted successfully", deletedUpdate });
  } catch (error) {
    res.status(500).json({ error: "Error deleting update" });
  }
};

exports.updateUpdate = async (req, res) => {
    try {
      const { id, title, description, date, createdBy, link } = req.body;
  
      // Validate ID
      if (!id) {
        return res.status(400).json({ success: false, message: "ID is required to update an update." });
      }
  
      // Update the update
      const updatedUpdate = await Update.findByIdAndUpdate(
        id,
        { title, description, date, createdBy, link },
        { new: true } // Return the updated document
      );
  
      if (!updatedUpdate) {
        return res.status(404).json({ success: false, message: "Update not found." });
      }
  
      res.status(200).json({ success: true, message: "Update updated successfully.", update: updatedUpdate });
    } catch (error) {
      console.error("Error updating update:", error);
      res.status(500).json({ success: false, message: "Failed to update update." });
    }
  };
  