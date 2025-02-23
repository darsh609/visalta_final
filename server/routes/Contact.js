const express = require("express")
const router = express.Router()
const { contactUsController,getAllContacts,deleteContact } = require("../controllers/ContactUs")
const { auth,isStudent,isAdmin } = require("../middlewares/auth")
router.post("/contactus",contactUsController)

router.get("/contacts",auth,isAdmin, getAllContacts);

// Route to delete a specific contact by ID
router.delete("/contact/:id",auth,isAdmin, deleteContact);


module.exports = router
