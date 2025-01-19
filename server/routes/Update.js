const express = require("express");
const router = express.Router();
const updateController = require("../controllers/Updates");

// Routes for managing updates
router.get("/getupdate", updateController.getAllUpdates); // Get all updates
router.post("/createupdate", updateController.createUpdate); // Create a new update
router.delete("/deleteupdate", updateController.deleteUpdate); // Delete an update
// router.put("/:id", updateController.updateUpdate); // Edit an update

module.exports = router;
