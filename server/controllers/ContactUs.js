// const { contactUsEmail } = require("../mail/templates/contactFormRes")
// const mailSender = require("../utils/mailSender")

// exports.contactUsController = async (req, res) => {
//   const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
//   // console.log(req.body)

//   try {
//     const emailRes = await mailSender(
//       email,
//       "Your Data send successfully",
//       contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
//     )
//     console.log("Email Res ", emailRes)
//     return res.json({
//       success: true,
//       message: "Email send successfully",
//     })
//   } catch (error) {
//     console.log("------------")
//     console.log("Errorrrrrrrrrr", error)
//     console.log("Error messageeeeeeeee :", error.message)
//     return res.json({
//       success: false,
//       message: "Something went wrong...",
//     })
//   }
// }
const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");
const Contact = require("../models/Contact"); // Import the Contact model

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