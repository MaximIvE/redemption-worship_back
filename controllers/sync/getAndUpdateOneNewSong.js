const mammoth = require('mammoth');
const { initDrive } = require('../../connect');
const { separateSong } = require('../../helpers');
const {Song} = require('../../models/song');

const googleDrive = initDrive();


const getNewSongWithDrive = async (id) => {

    // Отримуємо файл як потік даних
    const response = await googleDrive.files.get(
    { fileId: id, alt: 'media' },
    { responseType: 'arraybuffer' }
    );

    const buffer = Buffer.from(response.data);
    const { value: text } = await mammoth.extractRawText({ buffer });

    const songText = separateSong(text);

    return songText;
};

const getAllSongsIdWithMongo = async () => {
    const mongoSongs = await Song.find().select('song_id title -_id');

    return mongoSongs;
};

const updateOneSongByMongo = async(song_id, song) => {
const updatedSong = await Song.findOneAndUpdate(
    { song_id },
    song,
    { new: true, runValidators: true }
  );
     
  return updatedSong;
}


const syncOneSong = async(song_id) => {
    const song = await getNewSongWithDrive(song_id);
    const updatedData = await updateOneSongByMongo(song_id, song);

    return updatedData;
}

const syncDataSongById = async (req, res) => {
    const updatedData = await syncOneSong(req.params.id);
   
    res.status(201).json(updatedData);
};

const syncManySongs = async song => {

    try {
        const result = await syncOneSong(song.song_id);
        return result;
    } catch (error) {
        return { song, error }
    }
};

const separateResults = results => {
    return {
        success: results.filter(song => song.song_id),
        errors: results.filter(song => song.error)
    }
}


const syncAllDataSongs = async(req, res) => {
    const mongoSongs = await getAllSongsIdWithMongo();

    const resultsPromises =  mongoSongs.map(syncManySongs);
    const results = await Promise.all(resultsPromises);

    const data = separateResults(results)

    res.status(201).json(data);
}


module.exports = {
    syncDataSongById,
    syncAllDataSongs
};