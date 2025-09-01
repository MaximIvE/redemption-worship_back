// В тестовій БД вже були пісні, які були синхронізовані з Драйва, а потім з Драйва пісні видалені та були заведені
//  інші ті самі пісні, але вже з іншими ID. Тож, задача взяти {id, title} нових пісень з Драйва та оновити в Mongo song_id по title
// Тож, цей роут заміни в MongoDb song_id по ключу title.

const { RequestError } = require("../../helpers");
const {Song} = require("../../models/song");


const updateMany = async (req, res) => {
const key = req.query.key || "song_id"  //По цьому ключу буде відбуватись пошук пісень в базі. Може бути також 'title' адже воно також унікальне

const songs = req.body;    // Масив об'єктів з оновленими даними;
if(!songs.length) throw RequestError(400);

const resultsPromises =  songs.map(async song => {
    const findBy = {[key]: song[key]};
    const cleanSong = {...song}
    delete cleanSong[key];

    try {
        const updatedSong = await Song.findOneAndUpdate( findBy, { $set: cleanSong }, { new: true, runValidators: true } );
        if(!updatedSong) throw RequestError(404);
        return updatedSong;
    } catch (error) {
        return { song, error }
    }
});

const results = await Promise.all(resultsPromises);

const data = {
        success: results.filter(song => song.song_id),
        errors: results.filter(song => song.error)
    }

res.status(201).json(data)
};

module.exports = updateMany;