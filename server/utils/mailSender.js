// const nodemailer = require("nodemailer")

// const mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       secure: false,
//     })

//     let info = await transporter.sendMail({
//       from: `"Visalta | NITW" <${process.env.MAIL_USER}>`, // sender address
//       to: `${email}`, // list of receivers
//       subject: `${title}`, // Subject line
//       html: `${body}`, // html body
//     })
//     console.log(info.response)
//     return info
//   } catch (error) {
//     console.log(error.message)
//     return error.message
//   }
// }

// module.exports = mailSender

// const SibApiV3Sdk = require("sib-api-v3-sdk");
// // Initialize Brevo once
// const client = SibApiV3Sdk.ApiClient.instance;
// client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
// const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();
// /**
//  * Generic Mail Sender (Brevo API)
//  * @param {string} email - receiver email
//  * @param {string} title - subject
//  * @param {string} body - html content
//  */
// const mailSender = async (email, title, body) => {
//   try {
//     console.log("MAIL SENT:",process.env.BREVO_API_KEY );
//     const response = await emailApi.sendTransacEmail({
//       sender: {
//         email: process.env.SENDER_EMAIL,
//         name: "Visalta | NITW",
//       },
//       to: [{ email }],
//       subject: title,
//       htmlContent: body,
//     });

    
//     return response;
//   } catch (error) {
//     // console.error(
//     //   "MAIL ERROR:",
//     //   error.response?.text || error.message
//     // );
//     throw error;
//   }
// };

// module.exports = mailSender;
const SibApiV3Sdk = require("sib-api-v3-sdk");

/**
 * Generic Mail Sender (Brevo API)
 * @param {string} email - receiver email
 * @param {string} title - subject
 * @param {string} body - html content
 */
const mailSender = async (email, title, body) => {
  try {
    // 🔐 Create an isolated, authenticated client
    const client = new SibApiV3Sdk.ApiClient();
    client.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi(client);

    const response = await emailApi.sendTransacEmail({
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "Visalta | NITW",
      },
      to: [{ email }],
      subject: title,
      htmlContent: body,
    });

    console.log("BREVO MESSAGE ID:", response.messageId);
    return response;

  } catch (error) {
    console.error(
      "BREVO MAIL ERROR:",
      error.response?.text || error.message
    );
    throw error;
  }
};

module.exports = mailSender;
