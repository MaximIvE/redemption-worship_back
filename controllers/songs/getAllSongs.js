const { RequestError, sortByTitle } = require("../../helpers");
const {Song} = require("../../models/song");


const getAll = async (req, res) => {
const {search=""} = req.query;

const data = await Song.find(
    {
        $or: [
            {"lyrics.lines.text": {$regex: search, $options: "i"}},
            {artist: {$regex: search, $options: "i"}}
        ]
    }
).select('song_id title title_en language -_id');

if(!data.length) throw RequestError(404);
const sortData = sortByTitle(data);

res.json(sortData)
}

module.exports = getAll;