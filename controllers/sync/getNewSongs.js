// Повертає нові пісні з Драйва, яких немає в Монго
require('dotenv').config();
const { initDrive } = require("../../connect");
const { sortByTitle, separateOfNames, RequestError } = require("../../helpers");
const {Song} = require('../../models/song');

const FOLDER_ID = process.env.GOOGLE_LYRICS_ID;

const getNewSongs = async (req, res) => {
    let uniqueSortSongs = [];

    //Отримуємо дані з Гугл Диска
    const googleDrive = initDrive();

    const result = await googleDrive.files.list({
        // q: `'${FOLDER_ID}' in parents and trashed = false and name != 'ШАБЛОН.docx' and name contains '.docx'`,
        q: `'${FOLDER_ID}' in parents and trashed = false and name != 'ШАБЛОН'`,
        fields: 'files(id, name)'
      });
    const driveSongs = result.data.files;

    if(!driveSongs || driveSongs.length === 0) throw RequestError(404, "data from drive not found");
    const separateDriveSongs = separateOfNames(driveSongs);
    
    // Отримуємо дані з Монго
    const mongoSongs = await Song.find().select('song_id title -_id');

    const pattern = (mongoSongs && mongoSongs.length > 0) ? "compare and add" : "add all";
    switch (pattern) {
        case "compare and add": 
            const uniqueSongs = separateDriveSongs.filter(driveSong => !mongoSongs.some(mongoSong => mongoSong.song_id === driveSong.song_id));
            const songsWithUniqueTitles = uniqueSongs.map((uniqueSong => {
                const isUniqueTitle = !mongoSongs.some(mongoSong => mongoSong.title === uniqueSong.title);

                const {song_id, title, title_en, language} = uniqueSong;
                const uniqueTitle = isUniqueTitle ? title : title + "*";
                
                return {song_id, title: uniqueTitle, title_en, language}
            } ));

            if(songsWithUniqueTitles.length > 0) uniqueSortSongs = sortByTitle(songsWithUniqueTitles);
            break;

        case "add all": 
            uniqueSortSongs = sortByTitle(separateDriveSongs);
            break;
    }
    if(uniqueSortSongs.length === 0) return res.status(200).json({message: "all songs up to date"});

    res.json(uniqueSortSongs);
};


module.exports = getNewSongs;