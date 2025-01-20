const express = require("express");
const router = express.Router();
const { addAdmin } = require("../controllers/Admin");

router.post("/addAdmin", addAdmin);

module.exports = router;
