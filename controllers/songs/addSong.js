const { RequestError } = require("../../helpers");
const { Song } = require("../../models/song");


//Валідація тіла запиту при додаванні / зміні
const addOne = async(req, res) => {
    const song_id = req.params.id;
    const result = await Song.create({song_id, ...req.body});

    if(!result) throw RequestError(500);

    res.status(201).json(result);
};

module.exports = addOne;