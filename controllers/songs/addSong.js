const { addSongSchema } = require("../../schemas/songs");
const { RequestError } = require("../../helpers");


const add = async(req, res) => {
    // const result = await books.add(req.body);
    // res.json(result);
    res.json({mesage: "addSong"})
};

module.exports = add;