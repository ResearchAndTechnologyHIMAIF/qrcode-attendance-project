const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");
const { sendEmail } = require("../email/sendEmail");
const { sheets } = require("../services/google");

const sendQR = async (req, res, next) => {
  try {
    const getAllRegisteredUser = await sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.SPREADSHEET_REGISTRATION_ID,
        range: "A2:G",
      })
      .then((response) => {
        const values = response.data.values;
        return values;
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    if (getAllRegisteredUser !== undefined) {
      function checkEmail(email) {
        return email[1] == getAllRegisteredUser[getAllRegisteredUser.length - 1][1];
      }

      const user = getAllRegisteredUser.find(checkEmail);

      if (user) return res.status(200).json({ message: "You already registered for this event, please check your email" });
    }

    if (getAllRegisteredUser == undefined || getAllRegisteredUser) {
      const link = `${process.env.CORS}/api/v1/attend?email=${getAllRegisteredUser[getAllRegisteredUser.length - 1][1]}&nim=${getAllRegisteredUser[getAllRegisteredUser.length - 1][2]}&name=${
        getAllRegisteredUser[getAllRegisteredUser.length - 1][3]
      }&generation=${getAllRegisteredUser[getAllRegisteredUser.length - 1][4]}&department=${getAllRegisteredUser[getAllRegisteredUser.length - 1][5]}&classes=${getAllRegisteredUser[getAllRegisteredUser.length - 1][6]}`;

      const encodedLink = link.replace(/ /g, "%20");

      const qrCodeDataUrl = await qrcode.toDataURL(encodedLink);

      const qrCodeFilePath = path.join(__dirname, "../public/temp", "QR-Code-Attendance.png");
      const imageBuffer = Buffer.from(qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""), "base64");
      fs.writeFileSync(qrCodeFilePath, imageBuffer);

      await sendEmail(getAllRegisteredUser[getAllRegisteredUser.length - 1][1], "[TICKET CONFIRMATION] You're ready for HIMAIF Event!", qrCodeFilePath, getAllRegisteredUser[getAllRegisteredUser.length - 1][2]);
      fs.unlinkSync(qrCodeFilePath);
      res.status(200).json({ message: "QR Code has been successfully sent, Please check your email:)" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { sendQR };
