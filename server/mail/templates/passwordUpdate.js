exports.passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
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
    
            .support {
                font-size: 14px;
                color: #ffffff !important;
                margin-top: 30px;
                padding-top: 30px;
                border-top: 1px solid #333333;
            }
    
            .highlight {
                color: #4ade80;
                font-weight: bold;
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
                <img class="logo" src="https://iili.io/3H2mdI1.jpg" alt="Visalta Logo" border="0" />
            </a>
            <div class="message">Password Update Successful</div>
            <div class="body">
                <p style="color: #ffffff !important;">Hello ${name}! 👋</p>
                <p style="color: #ffffff !important;">Your password has been successfully updated for your account:</p>
                <p style="color: #ffffff !important;"><span class="highlight">${email}</span></p>
                
                <div class="security-box">
                    <strong class="important-text">SECURITY NOTICE</strong>
                    <ul>
                        <li style="color: #ffffff !important;">This change was made on ${new Date().toLocaleDateString()}</li>
                        <li style="color: #ffffff !important;">If you didn't make this change, contact us immediately</li>
                        <li style="color: #ffffff !important;">Always use a strong, unique password</li>
                    </ul>
                </div>
                <p style="color: #ffffff !important;">Your account security is our top priority. If you didn't request this password change, please contact our security team right away.</p>
            </div>
            <div class="support">
                <p style="color: #ffffff !important;">Need assistance? Our support team is available 24/7 at 
                <a href="mailto:teamvisalta@gmail.com">teamvisalta@gmail.com</a></p>
                <p class="footer-text" style="color: #ffffff !important;">
                    For additional security tips and account management, visit our Help Center.
                </p>
            </div>
        </div>
    </body>
    </html>`
}