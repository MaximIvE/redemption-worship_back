require('dotenv').config();
const { getGoogleDrive } = require("../../connect");
const FOLDER_ID = process.env.GOOGLE_LYRICS_ID;


const getAll = async (req, res) => {
  console.log("api/songs");

  const googleDrive = getGoogleDrive();
  console.log("past drive");
  const result = await googleDrive.files.list({
    q: `'${FOLDER_ID}' in parents and trashed = false`,
    fields: 'files(id, name)',
  });
  console.log("past result");
  const data = result.data.files;  
  console.log("past data");
  res.json(data);
}

module.exports = getAll;