const {Song} = require("../../../models/song");

const getAllSongs = async () => {

const data = await Song.find();

return data;
}

module.exports = getAllSongs;