const {Song} = require("../../../models/song");

const addManySongs= async (songs) => {

const data = await Song.insertMany(songs, { ordered: false });

return data;
}

module.exports = addManySongs;