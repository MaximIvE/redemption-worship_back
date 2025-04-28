const { getGoogleDrive } = require("../../connect");
const mammoth = require('mammoth');
const { separateSong } = require("../../helpers");

const getById = async (req, res) => {
    console.log("api/songs/id");

    const googleDrive = getGoogleDrive();
    const id = req.params.id;
      
    // Отримуємо файл як потік даних
    const response = await googleDrive.files.get(
    { fileId: id, alt: 'media' },
    { responseType: 'arraybuffer' }
    );

    const buffer = Buffer.from(response.data);
    const { value: text } = await mammoth.extractRawText({ buffer });
    
    const songText = separateSong(text);
    res.json(songText);

};

module.exports = getById;