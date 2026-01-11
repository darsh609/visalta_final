const express = require("express");
const router = express.Router();
const notificationPreferenceController = require("../controllers/notificationPreferenceController");
const { auth, isStudent, isAdmin } = require("../middlewares/auth")
// Route to update (or create) notification preferences for a user.
router.put("/",auth, notificationPreferenceController.updateNotificationPreference);
router.get("/", auth,notificationPreferenceController.getNotificationPreference);
module.exports = router;
