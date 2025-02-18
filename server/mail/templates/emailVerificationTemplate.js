const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #1a1a1a;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #ffffff !important;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 40px 20px;
				text-align: center;
				background-color: #232323;
				border: 1px solid #333333;
			}

            /* Force all text elements to be white */
            .container p,
            .container div,
            .container span,
            .container li,
            .container ul,
            .body p,
            .body div,
            .support p,
            .support div {
                color: #ffffff !important;
            }
	
			.logo {
				max-width: 200px;
				margin-bottom: 30px;
				padding: 20px;
				background-color: #ffffff;
				border-radius: 10px;
			}
	
			.message {
				font-size: 28px;
				font-weight: bold;
				margin-bottom: 30px;
				color: #ffffff !important;
				padding: 10px 0;
				text-transform: uppercase;
				letter-spacing: 2px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
				line-height: 1.6;
				color: #ffffff !important;
			}
	
			.cta {
				display: inline-block;
				padding: 15px 30px;
				background-color: #4ade80;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin: 20px 0;
			}
	
			.support {
				font-size: 14px;
				color: #ffffff !important;
				margin-top: 30px;
				padding-top: 30px;
				border-top: 1px solid #333333;
			}
	
			.highlight {
				font-size: 36px;
				font-weight: bold;
				color: #4ade80;
				background-color: #1c2a1f;
				padding: 20px 40px;
				margin: 25px 0;
				border: 2px solid #4ade80;
				display: inline-block;
				letter-spacing: 8px;
				border-radius: 8px;
				text-shadow: 0 0 10px rgba(74, 222, 128, 0.3);
			}

			.timer {
				color: #ffffff !important;
				font-size: 14px;
				margin: 20px 0;
				padding: 12px 20px;
				background-color: #1c2a1f;
				display: inline-block;
				border-radius: 5px;
				border: 1px solid #4ade80;
			}

			.security-box {
				background-color: #1c2a1f;
				padding: 20px;
				margin: 25px 0;
				text-align: left;
				border-left: 3px solid #4ade80;
				border-radius: 0 8px 8px 0;
				color: #ffffff !important;
			}

			.security-box ul {
				margin: 10px 0;
				padding-left: 20px;
				color: #ffffff !important;
			}

			.security-box li {
				margin: 8px 0;
				color: #ffffff !important;
			}

			a {
				color: #4ade80;
				text-decoration: underline;
			}

			.footer-text {
				color: #ffffff !important;
				font-size: 12px;
				margin-top: 15px;
			}

			.important-text {
				color: #4ade80;
				font-weight: bold;
			}

            /* Extra specific rules to force white text */
            p, div, span, li {
                color: #ffffff !important;
            }
		</style>
	</head>
	
	<body>
		<div class="container">
			<a href="">
				<img class="logo" src="https://iili.io/2yOho5Q.jpg" alt="Visalta-nitw-high-resolution-logo" border="0" />
			</a>
			<div class="message">Welcome to Visalta</div>
			<div class="body">
				<p style="color: #ffffff !important;">Hello there! 👋</p>
				<p style="color: #ffffff !important;">We're excited to have you join our community. To secure your account, please use the verification code below:</p>
				<h2 class="highlight">${otp}</h2>
				<div class="timer">
					⏳ Code expires in 5 minutes
				</div>
				<div class="security-box">
					<strong class="important-text">SECURITY NOTICE</strong>
					<ul>
						<li style="color: #ffffff !important;">This is your unique verification code</li>
						<li style="color: #ffffff !important;">Never share this code with anyone</li>
						<li style="color: #ffffff !important;">Our team will never ask for this code</li>
					</ul>
				</div>
				<p style="color: #ffffff !important;">After verification, you'll unlock full access to our platform's exclusive features.</p>
			</div>
			<div class="support">
				<p style="color: #ffffff !important;">Need assistance? Our support team is available 24/7 at 
				<a href="mailto:teamvisalta@gmail.com">teamvisalta@gmail.com</a></p>
				<p class="footer-text" style="color: #ffffff !important;">
					If you didn't request this verification, please ignore this email or contact our support team immediately.
				</p>
			</div>
		</div>
	</body>
	</html>`;
};

module.exports = otpTemplate;