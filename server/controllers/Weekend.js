const Weekend = require('../models/Weekend');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// Add Weekend
exports.addWeekend = async (req, res) => {
  try {
    const { placeName, location, timing, ticket } = req.body;
    const { image } = req.files; // Ensure you're using middleware like express-fileupload or multer

    if (!placeName || !location || !timing || !ticket || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImageToCloudinary(image, 'Weekends');
    const imageUrl = uploadedImage.secure_url;

    // Create a new Weekend document
    const weekend = new Weekend({
      placeName,
      imageUrl,
      location,
      timing,
      ticket,
    });

    await weekend.save();
    res.status(201).json({ message: 'Weekend added successfully', weekend });
  } catch (error) {
    console.error('Error adding weekend:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Weekends
exports.getWeekends = async (req, res) => {
  try {
    const weekends = await Weekend.find();
    res.status(200).json(weekends);
  } catch (error) {
    console.error('Error fetching weekends:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Weekend
exports.deleteWeekend = async (req, res) => {
  try {
    const { id } = req.params;

    const weekend = await Weekend.findById(id);
    if (!weekend) {
      return res.status(404).json({ message: 'Weekend not found' });
    }

    // Optional: If needed, delete the image from Cloudinary
    // const publicId = weekend.imageUrl.split('/').pop().split('.')[0];
    // await cloudinary.uploader.destroy(`Weekends/${publicId}`);

    await Weekend.findByIdAndDelete(id);
    res.status(200).json({ message: 'Weekend deleted successfully' });
  } catch (error) {
    console.error('Error deleting weekend:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
