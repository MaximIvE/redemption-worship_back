const {Song} = require('../../models/song');
const { RequestError } = require("../../helpers");

const addMany = async (req, res) => {
const data = req.body;
if(!data || data.length === 0) throw RequestError(400); 

const addedSongs = await Song.insertMany(data, { ordered: false });

res.status(201).json(addedSongs);
};

module.exports = addMany;