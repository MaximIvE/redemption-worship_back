const { RequestError, sortByTitle } = require("../../helpers");
const {Song} = require("../../models/song");


const getAll = async (req, res) => {
const search = req.query.search?.trim(); // Пошуковий запит (фільтр) по текстам, виконавцям
let data = [];
// Якщо є пошуковий запит, то використовуємо агрегацію. якщо ні - то звичайний пошук. 
// При агрегації додається нове поле 'search'
if(search) {
    data = await Song.aggregate([
        {$unwind: {path: "$lyrics", preserveNullAndEmptyArrays: true}},
        {$unwind: {path: "$lyrics.lines", preserveNullAndEmptyArrays: true}},

        {
            $match:{
                $or:[
                    {title: {$regex: search, $options: "i"}},
                    {title_en: {$regex: search, $options: "i"}},
                    {artist: {$regex: search, $options: "i"}},
                    {"lyrics.lines.text": {$regex: search, $options: "i"}}
                ]
            }
        },

        {
            $group:{
                _id: "$song_id",
                title: {$first: "$title"},
                title_en: {$first: "$title_en"},
                language: {$first: "$language"},
                createdAt: {$first: "$createdAt"},
                search: {
                    $first: {
                        $switch:{
                            branches: [
                                {case: {$regexMatch: {input: "$title", regex: search, options: "i"}}, then: ""},
                                {case: {$regexMatch: {input: "$title_en", regex: search, options: "i"}}, then: ""},
                                {case: {$regexMatch: {input: "$lyrics.lines.text", regex: search, options: "i"}}, then: "$lyrics.lines.text"},
                                {case: {$regexMatch: {input: "$artist", regex: search, options: "i"}}, then: "$artist"}
                            ]
                        }
                }
                },
                hasChords: {
                    $first: {
                            $cond: [
                            { $regexMatch: { input: "$lyrics.lines.chords", regex: /\S/ } }, // рядок містить хоча б один непробільний символ
                            true,   // якщо рядок містить акорд
                            false   // якщо рядок порожній або тільки пробіли
                            ]
                        }
                    },
            }
        },

        {
            $project:{
                _id: 0,
                song_id: "$_id",
                title: 1,
                title_en: 1, 
                language: 1,
                createdAt: 1,
                search: 1,
                hasChords: 1
            }
        }
    ]);
}else{
    data = await Song.find().select("song_id title title_en createdAt language -_id");
}


if(!data.length) throw RequestError(404);
const sortData = sortByTitle(data);


res.json(sortData)
}

module.exports = getAll;