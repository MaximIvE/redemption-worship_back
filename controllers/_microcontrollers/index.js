const getAllLyrics = require("./drive/getAllLyrics");
const addManySongs = require("./mongo/addManySongs");
const getAllSongs = require("./mongo/getAllSongs");


module.exports = {
    getAllLyrics,
    getAllSongs,
    addManySongs,
}
