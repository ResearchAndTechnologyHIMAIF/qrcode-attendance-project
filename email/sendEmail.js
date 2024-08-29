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

    const imageDataUri = `data:image/png;base64,${qrCodeFilePath}`;

    const mailOptions = {
      from: "noreply@gmail.com",
      to: email,
      subject: subject,
      attachments: [
        {
          filename: "qrcode.png",
          path: qrCodeFilePath,
        },
      ],
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>QR Code Attendance</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f0f0f0;
            margin: 50px;
          }
          h1 {
            color: #333;
          }
          img {
            border: 2px solid #ccc;
            border-radius: 5px;
            margin-top: 20px;
          }

          p {
            color: #666;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
          <h1>QR Code Attendance ${fullname}</h1>
          <img src=${imageDataUri} alt="QR Code"/>
          <p>Scan this QR code to record your attendance.</p>
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
