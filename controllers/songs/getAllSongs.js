require('dotenv').config();
const { getGoogleDrive } = require("../../connect");
const { separateOfName } = require('../../helpers');
const FOLDER_ID = process.env.GOOGLE_LYRICS_ID;


const getAll = async (req, res) => {
  console.log("api/songs");
  const { lang = "all" } = req.query;

  const googleDrive = getGoogleDrive();

  const result = await googleDrive.files.list({
    q: `'${FOLDER_ID}' in parents and trashed = false and name != 'ШАБЛОН.docx' and name contains '.docx'`,
    fields: 'files(id, name)',
  });

  const data = result.data.files;  

  if (!data || !data.length) throw RequestError(500);
  const newData = data.map(song => separateOfName(song)).filter(song => (lang==='all'? true : song.textLang === lang))

  res.json(newData);
}

module.exports = getAll;