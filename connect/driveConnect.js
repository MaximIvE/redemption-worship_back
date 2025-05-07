require('dotenv').config();
const {google} = require('googleapis');


const {GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID, GOOGLE_SCOPES} = process.env;

function initDrive(){
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      projectId: GOOGLE_PROJECT_ID,
      scopes: [GOOGLE_SCOPES],
    });

    return googleDrive = google.drive({ version: 'v3', auth });
  } catch (error) {
    console.log("GoogleDrive initialization error:", error);
  }
};

module.exports = initDrive;