const addMany = require("./addManySongs");
const addOne = require("./addSong");
const getAll = require("./getAllSongs");
const getById = require("./getSongById");
const updateOne = require('./updateOne');


module.exports = {
    getAll,
    getById,
    addOne,
    addMany,
    updateOne,
};