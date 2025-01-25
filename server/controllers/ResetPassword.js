const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);
		//////////////////////////////////

		const url = `http://localhost:3000/update-password/${token}`;
		

		await mailSender(
			email,
			"Password Reset",
			`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4" style="padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background-color: #5e60ce; color: #ffffff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold;">
              Password Reset Request
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #333333; line-height: 1.6; font-size: 16px;">
              <p style="margin: 0; margin-bottom: 16px;">Hello ${user.firstName}</strong>,</p>
              <p style="margin: 0; margin-bottom: 16px;">We received a request to reset your password. Please click the button below to proceed:</p>
              <p style="text-align: center; margin: 24px 0;">
                <a href="${url}" style="background-color: #5e60ce; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-size: 16px; font-weight: bold; display: inline-block;">
                  Reset Your Password
                </a>
              </p>
              <p style="margin: 0; margin-bottom: 16px;">If the button above does not work, you can copy and paste the following link into your browser:</p>
              <p style="word-break: break-all; background-color: #f4f4f4; padding: 10px; border-radius: 4px; color: #5e60ce; font-size: 14px; text-align: center;">
                ${url}
              </p>
              <p style="margin: 0; margin-top: 16px;">This link will expire in 30 minutes. If you did not request this password reset, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; padding: 20px; color: #666666; text-align: center; font-size: 14px;">
              <p style="margin: 0;">Thank you,<br>The Visalta Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;
		console.log("Token", token ,password, confirmPassword);

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		console.log("UserDetails", userDetails);
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};

