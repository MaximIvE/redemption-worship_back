const { RequestError, sortByTitle } = require("../../helpers");
const {Song} = require("../../models/song");


const getAll = async (req, res) => {

const data = await Song.find().select('song_id title title_en language -_id');
if(!data) throw RequestError(404);

const sortData = sortByTitle(data);

res.json(data)
}

module.exports = getAll;