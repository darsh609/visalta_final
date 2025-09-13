const NotificationPreference = require("../models/NotificationPreference");

exports.updateNotificationPreference = async (req, res) => {
  try {
    // Extract the required fields from the request body.
    // You can also use req.user if you are using an authentication middleware.
    const { userId, email, categories } = req.body;

    if (!userId || !email || !categories) {
      return res.status(400).json({
        success: false,
        message: "userId, email, and categories are required.",
      });
    }

    // Check if a preference already exists for this user.
    let notificationPreference = await NotificationPreference.findOne({ user: userId });

    if (notificationPreference) { // Update existing preference.
      notificationPreference.email = email;
      notificationPreference.categories = categories;
      await notificationPreference.save();

    } 
    else {
      // Create a new preference document.
      notificationPreference = new NotificationPreference({
        user: userId,
        email,
        categories,
      });
      await notificationPreference.save();
    }

    res.status(200).json({
      success: true,
      message: "Notification preferences updated successfully.",
      data: notificationPreference,
    });
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getNotificationPreference = async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      const notificationPreference = await NotificationPreference.findOne({ user: userId });
      if (!notificationPreference) {
        return res.status(404).json({
          success: false,
          message: "Notification preference not found for this user.",
        });
      }
  
      res.status(200).json({ success: true, notificationPreference });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  
