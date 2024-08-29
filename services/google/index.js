const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");

const auth = new GoogleAuth({
  credentials: {
    type: process.env.SERVICE_GOOGLE_SHEETS_TYPE,
    project_id: process.env.SERVICE_GOOGLE_SHEETS_PROJECTID,
    private_key_id: process.env.SERVICE_GOOGLE_SHEETS_PRIVATE_KEY_ID,
    private_key: process.env.SERVICE_GOOGLE_SHEETS_PRIVATE_KEY,
    client_email: process.env.SERVICE_GOOGLE_SHEETS_CLIENT_EMAIL,
    client_id: process.env.SERVICE_GOOGLE_SHEETS_CLIENT_ID,
    auth_uri: process.env.SERVICE_GOOGLE_SHEETS_AUTH_URI,
    token_uri: process.env.SERVICE_GOOGLE_SHEETS_AUTH_URI,
    auth_provider_x509_cert_url: process.env.SERVICE_GOOGLE_SHEETS_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.SERVICE_GOOGLE_SHEETS_CLIENT_CERT_URL,
    universe_domain: process.env.SERVICE_GOOGLE_SHEETS_UNIVERSE_DOMAIN,
  },
  scopes: ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/spreadsheets"],
});

const forms = google.forms({ version: "v1", auth });
const sheets = google.sheets({ version: "v4", auth });

module.exports = { forms, sheets };
