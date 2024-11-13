require("dotenv").config();

const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, qrCodeFilePath, fullname) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PWEMAIL,
      },
    });
    const mailOptions = {
      from: "noreply@gmail.com",
      to: email,
      subject: subject,
      attachments: [
        {
          filename: `${fullname}-QRCodeAttendance.png`,
          path: qrCodeFilePath,
        },
      ],
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        span {
            font-weight: bolder;
        }
        a {
            color: #4285f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #00295e;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #f4f4f4;
            color: #333;
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>TICKET CONFIRMATION</h1>
        </div>
        <div class="content">
            <p>Hi ${fullname}!,</p>
            <p>You're ready for HIMAIF Event. Here are the details:</p>
            <ul>
                <li><strong>Date:</strong> Saturday, 23 November 2024</li>
                <li><strong>Time:</strong> 08.30 - 12.00</li>
                <li><strong>Location:</strong> <a href="https://maps.app.goo.gl/ypbf3SD4GP51UNBV9">Bandung Creative Hub</a></li>
            </ul>
            <p>Your ticket is attached below, <span>please bring the ticket to the location for your presence</span></p>
            <p>We look forward to seeing you there!</p>
        </div>
        <div class="footer">
            <p>© 2024 Research & Technology Division HIMAIF IWU. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { sendEmail };
