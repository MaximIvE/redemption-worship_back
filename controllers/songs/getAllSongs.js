const { RequestError, sortByTitle } = require("../../helpers");
const {Song} = require("../../models/song");


const getAll = async (req, res) => {
const {search=""} = req.query; // Пошуковий запит (фільтр) по текстам, виконавцям

const data = await Song.aggregate([
    {$unwind: {path: "$lyrics", preserveNullAndEmptyArrays: true}},
    {$unwind: {path: "$lyrics.lines", preserveNullAndEmptyArrays: true}},

    {
        $match:{
            $or:[
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
            search: {
                $first: {
                    $switch:{
                        branches: [
                            {case: {$regexMatch: {input: "$lyrics.lines.text", regex: search, options: "i"}}, then: "$lyrics.lines.text"},
                            {case: {$regexMatch: {input: "$artist", regex: search, options: "i"}}, then: "$artist"}
                        ]
                    }
            }
        }}
    },

    {
        $project:{
            _id: 0,
            song_id: "$_id",
            title: 1,
            title_en: 1, 
            language: 1,
            search: 1
        }
    }
]);


if(!data.length) throw RequestError(404);
const sortData = sortByTitle(data);

res.json(sortData)
}

module.exports = getAll;