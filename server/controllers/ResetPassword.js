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
				message: `This Email: ${email} is nottttt Registered With Us Enter a Valid Email `,
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

		const url = `https://www.visalta.in/update-password/${token}`;
		

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
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #1a1a1a;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#1a1a1a" style="padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#232323" style="border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); border: 1px solid #333333;">
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <img src="https://iili.io/3H2mdI1.jpg" alt="Visalta Logo" style="max-width: 200px; padding: 20px; background-color: #ffffff; border-radius: 10px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #1c2a1f; color: #ffffff; padding: 20px; text-align: center; font-size: 28px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; border-bottom: 3px solid #4ade80;">
                            Password Reset Request
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; color: #ffffff; line-height: 1.6; font-size: 16px;">
                            <p style="margin: 0; margin-bottom: 16px; color: #ffffff !important;">Hello ${user.firstName},</p>
                            <p style="margin: 0; margin-bottom: 16px; color: #ffffff !important;">We received a request to reset your password. Please click the button below to proceed:</p>
                            <p style="text-align: center; margin: 24px 0;">
                                <a href="${url}" style="background-color: #4ade80; color: #000000; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">
                                    Reset Your Password
                                </a>
                            </p>
                            <div style="background-color: #1c2a1f; padding: 20px; margin: 25px 0; text-align: left; border-left: 3px solid #4ade80; border-radius: 0 8px 8px 0;">
                                <strong style="color: #4ade80;">IMPORTANT</strong>
                                <p style="margin: 10px 0; color: #ffffff !important;">If the button above doesn't work, copy and paste this link:</p>
                                <p style="word-break: break-all; background-color: #2a3b2f; padding: 10px; border-radius: 4px; color: #4ade80; font-size: 14px; margin: 0;">
                                    ${url}
                                </p>
                            </div>
                            <div style="background-color: #1c2a1f; padding: 20px; margin: 25px 0; text-align: left; border-left: 3px solid #4ade80; border-radius: 0 8px 8px 0;">
                                <strong style="color: #4ade80;">SECURITY NOTICE</strong>
                                <ul style="color: #ffffff !important; margin: 10px 0;">
                                   
                                    <li style="margin: 8px 0;">If you didn't request this reset, please contact us immediately</li>
                                    <li style="margin: 8px 0;">Never share this link with anyone</li>
									 <li style="margin: 8px 0;">This link will expire in 30 minutes</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #1c2a1f; padding: 20px; color: #ffffff; text-align: center; font-size: 14px; border-top: 1px solid #333333;">
                            <p style="margin: 0; color: #ffffff !important;">Need assistance? Contact us at<br>
                            <a href="mailto:teamvisalta@gmail.com" style="color: #4ade80; text-decoration: underline;">teamvisalta@gmail.com</a></p>
                            <p style="margin: 0; margin-top: 15px; font-size: 12px; color: #ffffff !important;">
                                Thank you,<br>The Visalta Team
                            </p>
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

