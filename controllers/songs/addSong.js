const { RequestError } = require("../../helpers");
const Song = require("../../models/song");

//Валідація тіла запиту при додаванні / зміні
const add = async(req, res) => {
    const result = await Song.create(req.body);

    if(!result) throw RequestError(500);

    res.status(201).json(result);
};

module.exports = add;