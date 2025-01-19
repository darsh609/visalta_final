const express = require("express");
const router = express.Router();
const updateController = require("../controllers/Updates");
const { auth, isStudent, isAdmin } = require("../middlewares/auth")
// Routes for managing updates
router.get("/getupdate", updateController.getAllUpdates); // Get all updates
router.post("/createupdate", updateController.createUpdate); // Create a new update
router.delete("/deleteupdate", updateController.deleteUpdate); // Delete an update
  router.put("/updateupdate",updateController.updateUpdate); // Edit an update

module.exports = router;
