const { RequestError } = require("../../helpers");
const {Song} = require("../../models/song");


const getAll = async (req, res) => {

const data = await Song.find();
if(!data) throw RequestError(404);

res.json(data)
}

module.exports = getAll;