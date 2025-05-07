require('dotenv').config();
const { initDrive } = require('../../../connect');


const FOLDER_ID = process.env.GOOGLE_LYRICS_ID;

const getAllLyrics = async () => {

  const googleDrive = initDrive();
  const result = await googleDrive.files.list({
    q: `'${FOLDER_ID}' in parents and trashed = false and name != 'ШАБЛОН.docx' and name contains '.docx'`,
    fields: 'files(id, name)',
  });

 return result.data.files;
}

module.exports = getAllLyrics;