// Повертає нові пісні з Драйва, яких немає в Монго

const { separateOfNames, RequestError } = require("../../helpers");
const { getAllLyrics, getAllSongs } = require("../_microcontrollers");


const sortByTitle = (obj) => obj.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase(), 'ru', { sensitivity: 'base' }));

const getNewSongs = async (req, res) => {
    let uniqueSortSongs = [];

    const driveSongs = await getAllLyrics();
    if(!driveSongs || driveSongs.length === 0) throw RequestError(404, "data from drive not found");
    const separateDriveSongs = separateOfNames(driveSongs);
    
    // БД може бути порожньою, тоді даних не отримаємо
    const mongoSongs = await getAllSongs();

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