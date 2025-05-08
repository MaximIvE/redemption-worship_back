const mammoth = require('mammoth');
const { initDrive } = require('../../connect');
const { separateSong } = require('../../helpers');

const googleDrive = initDrive();


const getNewById = async (req, res) => {
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

module.exports = getNewById;