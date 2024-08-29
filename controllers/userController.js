const { sheets } = require("../services/google/index");

const getUserRegistrationData = async (req, res, next) => {
  try {
    sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.SPREADSHEET_REGISTRATION_ID,
        range: "A2:G",
      })
      .then((response) => {
        const values = response.data.values;
        res.status(200).json({ payload: values });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  } catch (error) {
    next(error);
  }
};

const getUserAttendanceData = async (req, res, next) => {
  try {
    sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.SPREADSHEET_ATTENDANCE_ID,
        range: "A2:G",
      })
      .then((response) => {
        const values = response.data.values;
        res.status(200).json({ payload: values });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserRegistrationData, getUserAttendanceData };
