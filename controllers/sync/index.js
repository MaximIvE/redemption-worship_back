const getNewById = require("./getNewSongById");
const getNewSongs = require("./getNewSongs");
const {syncDataSongById, syncAllDataSongs} = require("./getAndUpdateOneNewSong");


module.exports = {
    getNewSongs,
    getNewById,
    syncDataSongById,
    syncAllDataSongs
}
