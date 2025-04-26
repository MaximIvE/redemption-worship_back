const {google} = require('googleapis');

const {GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID, GOOGLE_SCOPES} = process.env;

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  },
  projectId: GOOGLE_PROJECT_ID,
  scopes: [GOOGLE_SCOPES],
});

const drive = google.drive({ version: 'v3', auth });

if (drive) console.log("Google drive is active")
 
function getDrive(){
    return drive;
}

module.exports = getDrive;