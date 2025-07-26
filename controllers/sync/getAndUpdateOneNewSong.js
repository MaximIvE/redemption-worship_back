const mammoth = require('mammoth');
const { driveAuth } = require('../../connect');
const { separateSong, parseSong } = require('../../helpers');
const {Song} = require('../../models/song');
const { google } = require('googleapis');

const googleAuth = driveAuth();

const getLanguage = (text) => {
    const uaOnlyRegex = /[ґҐіІїЇєЄ]/;
    const ruOnlyRegex = /[ёЁъЪыЫэЭ]/;

    if (uaOnlyRegex.test(text)) return "ukr";
    if (ruOnlyRegex.test(text)) return "rus";
    return null;
}


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
    console.log(song)
    const data = await Song.findOne({song_id});
    
    console.log(data)
const updatedSong = await Song.findOneAndUpdate(
    { song_id },
    song,
    { new: true, runValidators: true }
  );
     
  return updatedSong;
}


const syncOneSong = async(song_id) => {
    const song = await getNewSongWithDrive(song_id);
    // Оновлюємо пісню
    const  updatedData = await updateOneSongByMongo(song_id, song);
    // Якщо її немає, то записуємо нову
    console.log({updatedData})
    if(updatedData === null) {
        const language = getLanguage(song.lyrics?.[0].text || song.title);
        const createdSong =  await Song.create({song_id, language, ...song});
        return createdSong;
    };

    return updatedData;
}

const syncDataSongById = async (req, res) => {  // торимуємо дані з Гугл диска
    const updatedData = await syncOneSong(req.params.id);
   
    res.status(201).json(updatedData);
};

const syncOneSongCallback = async song => {

    try {
        const result = await syncOneSong(song.song_id); // передаємо id пісні з MongoDb
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
    const mongoSongs = await getAllSongsIdWithMongo();  //  [{song_id, title}] з Mongodb

    const resultsPromises =  mongoSongs.map(syncOneSongCallback);
    const results = await Promise.all(resultsPromises);

    const data = separateResults(results)

    res.status(201).json(data);
}


module.exports = {
    syncDataSongById,
    syncAllDataSongs
};