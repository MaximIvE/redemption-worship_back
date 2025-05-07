const {Song} = require('../../models/song');
const { RequestError } = require("../../helpers");

const addMany = async (req, res) => {
const data = req.body;
if(!data || data.length === 0) throw RequestError(400); 

const addedSongs = await Song.insertMany(data, { ordered: false });
if(!addedSongs || addedSongs.length === 0) throw RequestError(500, "failed to add 0 songs"); 


res.status(201).json(addedSongs);
}

module.exports = addMany;