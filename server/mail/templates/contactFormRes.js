exports.contactUsEmail = (
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    countrycode
) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Confirmation</title>
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
    
            .details-box {
                background-color: #1c2a1f;
                padding: 25px;
                margin: 25px 0;
                text-align: left;
                border-left: 3px solid #4ade80;
                border-radius: 0 8px 8px 0;
            }

            .details-item {
                margin: 12px 0;
                padding-bottom: 8px;
                border-bottom: 1px solid #333333;
            }

            .details-label {
                color: #4ade80 !important;
                font-weight: bold;
                margin-right: 10px;
            }

            .message-box {
                background-color: #1c2a1f;
                padding: 20px;
                margin: 25px 0;
                text-align: left;
                border: 1px solid #4ade80;
                border-radius: 8px;
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

            a {
                color: #4ade80;
                text-decoration: underline;
            }

            .footer-text {
                color: #ffffff !important;
                font-size: 12px;
                margin-top: 15px;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="">
                <img class="logo" src="https://i.postimg.cc/dQb3HqdF/Visalta.jpg" alt="Visalta Logo" border="0" />
            </a>
            <div class="message">Thank You for Reaching Out</div>
            <div class="body">
                <p style="color: #ffffff !important;">Hello ${firstname} ${lastname}! 👋</p>
                <p style="color: #ffffff !important;">We've successfully received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you shortly.</p>
                
                <div class="details-box">
                    <div class="details-item">
                        <span class="details-label">Name:</span>
                        <span>${firstname} ${lastname}</span>
                    </div>
                    <div class="details-item">
                        <span class="details-label">Email:</span>
                        <span>${email}</span>
                    </div>
                    <div class="details-item">
                        <span class="details-label">Phone:</span>
                        <span>${countrycode} ${phoneNo}</span>
                    </div>
                </div>

                <div class="message-box">
                    <div class="details-label">Your Message:</div>
                    <p style="color: #ffffff !important; margin: 10px 0;">${message}</p>
                </div>

                <div class="timer">
                    ⏱️ We typically respond within 24-48 hours
                </div>

                <p style="color: #ffffff !important;">Rest assured that your message is important to us, and we're committed to providing you with the assistance you need.</p>
            </div>
            <div class="support">
                <p style="color: #ffffff !important;">Need immediate assistance? Our support team is available 24/7 at 
                <a href="mailto:teamvisalta@gmail.com">teamvisalta@gmail.com</a></p>
                <p class="footer-text">
                    Thank you for choosing Visalta. We look forward to connecting with you!
                </p>
            </div>
        </div>
    </body>
    </html>`
}