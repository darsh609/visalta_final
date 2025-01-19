const Update = require("../models/Update");

// Get all updates
exports.getAllUpdates = async (req, res) => {
  try {
    const updates = await Update.find().sort({ date: -1 });
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ error: "Error fetching updates" });
  }
};

// Add a new update
exports.createUpdate = async (req, res) => {
  try {
    const { title, description, date, createdBy, link } = req.body;
    const newUpdate = new Update({ title, description, date, createdBy, link });
    await newUpdate.save();
    res.status(201).json(newUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error creating update" });
  }
};

// Delete an update


// Delete an update (ID passed in body)
exports.deleteUpdate = async (req, res) => {
  try {
    const { id } = req.body; // ID is extracted from the request body
    if (!id) {
      return res.status(400).json({ error: "ID is required to delete an update." });
    }
    const deletedUpdate = await Update.findByIdAndDelete(id);
    if (!deletedUpdate) {
      return res.status(404).json({ error: "Update not found." });
    }
    res.status(200).json({ message: "Update deleted successfully", deletedUpdate });
  } catch (error) {
    res.status(500).json({ error: "Error deleting update" });
  }
};

exports.updateUpdate = async (req, res) => {
    try {
      const { id, title, description, date, createdBy, link } = req.body;
  
      // Validate ID
      if (!id) {
        return res.status(400).json({ success: false, message: "ID is required to update an update." });
      }
  
      // Update the update
      const updatedUpdate = await Update.findByIdAndUpdate(
        id,
        { title, description, date, createdBy, link },
        { new: true } // Return the updated document
      );
  
      if (!updatedUpdate) {
        return res.status(404).json({ success: false, message: "Update not found." });
      }
  
      res.status(200).json({ success: true, message: "Update updated successfully.", update: updatedUpdate });
    } catch (error) {
      console.error("Error updating update:", error);
      res.status(500).json({ success: false, message: "Failed to update update." });
    }
  };
  