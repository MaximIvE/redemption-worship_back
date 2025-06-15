const {google} = require('googleapis');
const { driveAuth } = require('../../connect');
const { parseSong, separateSong } = require('../../helpers');


const getNewById = async (req, res) => {
    const id = req.params.id;
    const googleAuth = driveAuth();
    const docs = google.docs({version: 'v1', auth: googleAuth});
    const result = await docs.documents.get({documentId: id});
    
    const content = result.data.body.content;
    const songText = parseSong(content);
    const songObj = separateSong(songText);

    res.json(songObj);
};

module.exports = getNewById;