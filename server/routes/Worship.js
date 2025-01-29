const express = require('express');
const router = express.Router();
const TempleController = require('../controllers/Worship');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // Temp folder for multer (can be improved)

// Routes
router.post('/add', TempleController.addTemple); // Add temple
router.get('/get', TempleController.getTemples); // Get all temples
router.delete('/delete/:id', TempleController.deleteTemple); // Delete temple

module.exports = router;
