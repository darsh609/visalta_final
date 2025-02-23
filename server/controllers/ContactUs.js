const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");
const Contact = require("../models/Contact"); // Import the Contact model

// POST: Handle Contact Form Submission
exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;

  try {
    // Validate input
    if (!email || !firstname || !lastname || !message || !phoneNo || !countrycode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required. Please provide complete details."
      });
    }

    // Save the contact details to the database
    const contactData = new Contact({
      email,
      firstname,
      lastname,
      message,
      phoneNo,
      countrycode,
    });
    await contactData.save();

    // Send the email
    const emailRes = await mailSender(
      email,
      "Your Data sent successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );
    console.log("Email Res ", emailRes);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully and data saved to the database."
    });
  } catch (error) {
    console.error("Error saving contact or sending email: ", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request. Please try again later."
    });
  }
};

// GET: Retrieve all contact messages
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error("Error retrieving contacts: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching contacts."
    });
  }
};

// DELETE: Remove a specific contact by ID
exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting contact: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the contact."
    });
  }
};
