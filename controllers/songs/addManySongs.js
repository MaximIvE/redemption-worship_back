const {Song} = require('../../models/song');
const { RequestError } = require("../../helpers");

const addMany = async (req, res) => {
const data = req.body;
if(!data || data.length === 0) throw RequestError(400); 

try {
    const addedSongs = await Song.insertMany(data, { ordered: false });

    res.status(201).json(addedSongs);
} catch (error) {
    const {name, code, message} = error;
    error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    throw RequestError(error.status, message); 
}
};

module.exports = addMany;