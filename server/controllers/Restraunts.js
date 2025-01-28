const Restaurant = require("../models/Restraunts");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2; // Import cloudinary SDK

exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Extract the public ID of the image from the image URL
    const imageUrl = restaurant.imageUrl;
    const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID (e.g., 'folder/food')

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(`restaurants/${publicId}`);

    // Delete the restaurant from the database
    await Restaurant.findByIdAndDelete(id);

    res.status(200).json({ message: "Restaurant deleted successfully!" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

exports.addRestaurant = async (req, res) => {
  try {
    const { name, openingHours, location, categories } = req.body;
    const { image } = req.files;

    if (!name || !openingHours || !location || !categories || !image) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImageToCloudinary(image, "restaurants");
    const imageUrl = uploadedImage.secure_url;

    // Create a new restaurant document
    const newRestaurant = new Restaurant({
      name,
      openingHours,
      location,
      imageUrl,
      categories: categories.split(","),
    });

    await newRestaurant.save();

    res.status(201).json({ message: "Restaurant added successfully!", restaurant: newRestaurant });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
