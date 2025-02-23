const express = require("express");
const requestController = require("../controllers/Request");

const router = express.Router();



// Route to submit a new request
router.post("/submit", requestController.submitRequest);

// Route to get all requests
router.get("/getrequest", requestController.getRequests);

// Route to delete a specific request by its ID
router.delete("/request/:id", requestController.deleteRequest);

module.exports = router;