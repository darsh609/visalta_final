const Temple = require('../models/Worship');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// Add Temple
exports.addTemple = async (req, res) => {
  try {
    const { name, timings, description, location } = req.body;
    const {image} = req.files;

    if (!name || !timings || !description || !location || !image) {
      return res.status(400).json({ message: 'Allllllllllll fields are required' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImageToCloudinary(image, 'Temples');
    const imageUrl = uploadedImage.secure_url;

    // Create a new temple document
    const temple = new Temple({
      name,
      timings,
      description,
      location,
      imageUrl,
    });

    await temple.save();
    res.status(201).json({ message: 'Temple added successfully', temple });
  }
   
  catch (error) {
    console.error('Error adding temple:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Temples
exports.getTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.status(200).json(temples);
  } catch (error) {
    console.error('Error fetching temples:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Temple
exports.deleteTemple = async (req, res) => {
  try {
    const { id } = req.params;

    const temple = await Temple.findById(id);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }

    // Optional: If Cloudinary is used, delete the image from Cloudinary
    // const publicId = temple.imageUrl.split('/').pop().split('.')[0];
    // await cloudinary.uploader.destroy(`Temples/${publicId}`);

    await Temple.findByIdAndDelete(id);
    res.status(200).json({ message: 'Temple deleted successfully' });
  } catch (error) {
    console.error('Error deleting temple:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
