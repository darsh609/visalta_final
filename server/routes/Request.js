const express = require("express");
const requestController = require("../controllers/Request");

const router = express.Router();

router.post("/submit", requestController.submitRequest);

module.exports = router;