const { sheets } = require("../services/google/index");
const { formatDate } = require("../utils/utils");

const attendUser = async (req, res, next) => {
  try {
    const getAllUserAttended = await sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.SPREADSHEET_ATTENDANCE_ID,
        range: "A2:H",
      })
      .then((response) => {
        const values = response.data.values;
        return values;
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    const getAllUserRegistered = await sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.SPREADSHEET_REGISTRATION_ID,
        range: "B2:H",
      })
      .then((response) => {
        const values = response.data.values;
        return values;
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    if (getAllUserAttended !== undefined) {
      function checkEmail(email) {
        return email[1] == req.body.email;
      }

      const userAttended = getAllUserAttended.find(checkEmail);

      if (userAttended)
        return res
          .status(200)
          .json({ message: "Your email already attended for this event" });
    }

    if (getAllUserRegistered !== undefined) {
      function checkEmail(email) {
        return email[0] == req.body.email;
      }

      const userRegistered = getAllUserRegistered.find(checkEmail);

      if (
        JSON.stringify(userRegistered) !==
        JSON.stringify(Object.values(req.body))
      )
        return res
          .status(200)
          .json({ message: "Your email haven't registered to this event" });
    }

    if (getAllUserAttended == undefined || getAllUserAttended) {
      if (getAllUserRegistered == undefined) {
        return res
          .status(200)
          .json({ message: "Your email haven't registered to this event" });
      } else {
        const dataUser = req.body;
        let data = Object.values(dataUser);
        data.unshift(formatDate(new Date()));
        const values = [data];

        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.SPREADSHEET_ATTENDANCE_ID,
          range: "A:H",
          valueInputOption: "RAW",
          resource: {
            values,
          },
        });

        res.status(200).json({
          message:
            "Your email attendance have been recorded, enjoy the event:) ",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { attendUser };
