const { getLyricsFiles, separateOfName, RequestError } = require("../../helpers");


const getAll = async (req, res) => {
    const data = await getLyricsFiles();
    if (!data || !data.length) throw RequestError(500);
    const newData = data.map( song => separateOfName(song))
    res.json(newData);
}

module.exports = getAll;