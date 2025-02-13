const Oneday = require('../models/Oneday');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// Add Oneday Place
exports.addOneday = async (req, res) => {
  try {
    const { placeName, location, timing } = req.body;
    const { image } = req.files; // Ensure you’re using a file upload middleware (e.g., multer)

    if (!placeName || !location || !timing || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImageToCloudinary(image, 'Oneday');
    const imageUrl = uploadedImage.secure_url;

    // Create a new oneday document
    const oneday = new Oneday({
      placeName,
      location,
      timing,
      imageUrl,
    });

    await oneday.save();
    res.status(201).json({ message: 'Oneday place added successfully', oneday });
  } catch (error) {
    console.error('Error adding oneday place:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Oneday Places
exports.getOneday = async (req, res) => {
  try {
    const onedayPlaces = await Oneday.find();
    res.status(200).json(onedayPlaces);
  } catch (error) {
    console.error('Error fetching oneday places:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Oneday Place
exports.deleteOneday = async (req, res) => {
  try {
    const { id } = req.params;
    const oneday = await Oneday.findById(id);
    if (!oneday) {
      return res.status(404).json({ message: 'Oneday place not found' });
    }

    // Optionally: delete the image from Cloudinary
    // const publicId = oneday.imageUrl.split('/').pop().split('.')[0];
    // await cloudinary.uploader.destroy(`Oneday/${publicId}`);

    await Oneday.findByIdAndDelete(id);
    res.status(200).json({ message: 'Oneday place deleted successfully' });
  } catch (error) {
    console.error('Error deleting oneday place:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
