const {google} = require ('googleapis');

const {GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID, GOOGLE_FOLDER_ID, GOOGLE_SCOPES} = process.env;
const exclusionName = "ШАБЛОН.docx";
const docxPattern = /\.docx$/;

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  },
  projectId: GOOGLE_PROJECT_ID,
  scopes: [GOOGLE_SCOPES],
});

const drive = google.drive({ version: 'v3', auth });

const FOLDER_ID = GOOGLE_FOLDER_ID;

async function getLyricsFiles() {
  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and trashed = false`,
    fields: 'files(id, name)',
  });

  return res.data.files.filter(song => (song.name !== exclusionName && docxPattern.test(song.name)));
}

module.exports = getLyricsFiles;