const { sheets } = require("../services/google/index");

const getUserRegistrationData = async (req, res, next) => {
  try {
    sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.SPREADSHEET_REGISTRATION_ID,
        range: "A:H",
        majorDimension: "ROWS",
      })
      .then((response) => {
        const values = response.data.values;
        const headers = values.shift();

        const formattedData = values.map((row) => {
          const rowObject = {};
          for (let i = 0; i < row.length; i++) {
            rowObject[headers[i]] = row[i];
          }
          return rowObject;
        });

        res.status(200).json({ payload: formattedData });
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
        range: "A:H",
        majorDimension: "ROWS",
      })
      .then((response) => {
        const values = response.data.values;
        const headers = values.shift();

        const formattedData = values.map((row) => {
          const rowObject = {};
          for (let i = 0; i < row.length; i++) {
            rowObject[headers[i]] = row[i];
          }
          return rowObject;
        });

        res.status(200).json({ payload: formattedData });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserRegistrationData, getUserAttendanceData };
