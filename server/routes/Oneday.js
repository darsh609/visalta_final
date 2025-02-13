const express = require('express');
const router = express.Router();
const onedayController = require('../controllers/Oneday');

// Create a new oneday place
router.post('/add', onedayController.addOneday);

// Get all oneday places
router.get('/get', onedayController.getOneday);

// Delete an oneday place by ID
router.delete('/delete/:id', onedayController.deleteOneday);

module.exports = router;
