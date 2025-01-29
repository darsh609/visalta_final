const express = require("express");
const router = express.Router();
const { addRestaurant, getRestaurants, deleteRestaurant } = require("../controllers/Restraunts");

// Add a restaurant
router.post("/add", addRestaurant);

// Get all restaurants
router.get("/get", getRestaurants);

// Delete a restaurant
router.delete("/delete/:id", deleteRestaurant);

module.exports = router;
