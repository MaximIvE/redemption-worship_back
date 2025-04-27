const { getGoogleDrive } = require("../../connect");
const FOLDER_ID = process.env.GOOGLE_LYRICS_ID;

const searchSettings = {
  q: `'${FOLDER_ID}' in parents and trashed = false and name != 'ШАБЛОН.docx' and name contains '.docx'`,
  fields: 'files(id, name)',
};

const getAll = async (req, res) => {
  console.log("api/songs");

  const googleDrive = getGoogleDrive();
  console.log("past drive");
  const result = await googleDrive.files.list(searchSettings);
  console.log("past result");
  const data = result.data.files;  
  console.log("past data");
  res.json(data);
}

module.exports = getAll;