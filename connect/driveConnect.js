const {google} = require('googleapis');
const { RequestError } = require('../helpers');

const {GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID, GOOGLE_SCOPES} = process.env;

let googleDrive = null;
async function initDrive(){
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
      projectId: GOOGLE_PROJECT_ID,
      scopes: [GOOGLE_SCOPES],
    });
    googleDrive = google.drive({ version: 'v3', auth });
    console.log('Google drive is active');
  } catch (error) {
    console.log("GoogleDrive initialization error:", error)
  }
};
 
function getGoogleDrive(){
    if(!googleDrive) throw RequestError(500, "");
    return googleDrive;
}

module.exports = {initDrive, getGoogleDrive};