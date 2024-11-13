const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");
const { sheets } = require("../services/google/index");
const { formatDate } = require("../utils/utils");
const { sendEmail } = require("../utils/sendEmail");

const registUser = async (req, res, next) => {
  try {
    const getAlluser = await sheets.spreadsheets.values
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

    if (getAlluser !== undefined) {
      function checkEmail(email) {
        return email[1] == req.body.email;
      }

      const user = getAlluser.find(checkEmail);

      if (user)
        return res.status(200).json({
          message:
            "You already registered for this event, please check your email",
        });
    }

    if (getAlluser == undefined || getAlluser) {
      const dataUser = req.body;
      let data = Object.values(dataUser);
      data.unshift(formatDate(new Date()));
      const values = [data];

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_REGISTRATION_ID,
        range: "A:G",
        valueInputOption: "RAW",
        resource: {
          values,
        },
      });

      const link = `${process.env.CORS}/api/v1/attend?email=${req.body.email}&nim=${req.body.nim}&name=${req.body.name}&phone=${req.body.phone}&generation=${req.body.generation}&department=${req.body.department}&classes=${req.body.classes}`;

      const encodedLink = link.replace(/ /g, "%20");

      const qrCodeDataUrl = await qrcode.toDataURL(encodedLink);

      const qrCodeFilePath = path.join("/tmp", "QR-Code-Attendance.png");
      const imageBuffer = Buffer.from(
        qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""),
        "base64"
      );

      fs.writeFileSync(qrCodeFilePath, imageBuffer);

      await sendEmail(
        req.body.email,
        "[TICKET CONFIRMATION] You're ready for HIMAIF Event!",
        qrCodeFilePath,
        req.body.name
      );
      fs.unlinkSync(qrCodeFilePath);
      res.status(200).json({
        message:
          "QR Code has been successfully sent, Please check your email:)",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registUser };
