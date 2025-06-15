const mammoth = require('mammoth');
const { driveAuth } = require('../../connect');
const { separateSong, parseSong } = require('../../helpers');
const {Song} = require('../../models/song');
const { google } = require('googleapis');

const googleAuth = driveAuth();


const getNewSongWithDrive = async (id) => {
    const docs = google.docs({version: 'v1', auth: googleAuth});
    const result = await docs.documents.get({documentId: id});

    const content = result.data.body.content;
    const songText = parseSong(content);
    const songObj = separateSong(songText);

    return songObj;
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