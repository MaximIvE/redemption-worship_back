const addMany = require("./addManySongs");
const add = require("./addSong");
const getAll = require("./getAllSongs");
const getById = require("./getSongById");


module.exports = {
    getAll,
    getById,
    add,
    addMany,
};