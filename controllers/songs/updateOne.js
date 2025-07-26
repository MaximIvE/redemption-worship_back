const { RequestError } = require("../../helpers");
const {Song} = require("../../models/song");

const updateOne = async (req, res) => {
const song_id = req.params.id;

const song = req.body;
const updatedSong = await Song.findOneAndUpdate(
    { song_id },
    song,
    { new: true, runValidators: true }
  );

if(!updatedSong) throw RequestError(404);

res.status(201).json(updatedSong)
};

module.exports = updateOne;