const express = require('express');
const router = express.Router();
const weekendController = require('../controllers/Weekend');

// Create a new weekend
router.post('/add', weekendController.addWeekend);

// Get all weekends
router.get('/get', weekendController.getWeekends);

// Delete a weekend by ID
router.delete('/delete/:id', weekendController.deleteWeekend);

module.exports = router;
