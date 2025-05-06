//Цей контроллер отримує всі пісні з Диска, отримує всі пісні з Монго, порівнює по id і завантажує в Mongo нові пісні з Диска (тільки title, title_en, song_id, langauge)

const { separateOfNames, RequestError } = require("../../helpers");
const { getAllLyrics, getAllSongs, addManySongs } = require("../_microcontrollers");



const sortByTitle = (obj) => obj.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase(), 'ru', { sensitivity: 'base' }));


const syncAndAddSongs = async (req, res) => {
    const driveSongs = await getAllLyrics();
    if(!driveSongs || driveSongs.length === 0) throw RequestError(404, "data from drive not found");
    const mongoSongs = await getAllSongs();

    const separateDriveSongs = separateOfNames(driveSongs);
 
    const pattern = (mongoSongs && mongoSongs.length > 0) ? "compare and add" : "add all";

    let uniqueSortSongs = [];
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

    const addedSongs = await addManySongs(uniqueSortSongs);

    const numberOfNewSongs = uniqueSortSongs.length;
    const numberOfAddedSongs = addedSongs.length;
    if(numberOfAddedSongs === 0) throw RequestError(500, `failed to add ${numberOfNewSongs} songs`);


    res.json(addedSongs);
};


module.exports = syncAndAddSongs;