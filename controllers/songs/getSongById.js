const { RequestError } = require('../../helpers');
const {Song} = require('../../models/song');


const getById = async (req, res) => {
    const song_id = req.params.id;
      
    const data = await Song.findOne({song_id});
    if (!data) throw RequestError(404);

    res.json(data);
};

module.exports = getById;