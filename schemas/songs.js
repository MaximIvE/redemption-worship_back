const Joi = require("joi");

const bpmReg = /^\d{1,3},\d{2}$/;
const timeSigReg = /^\d{1,2}\/\d{1,2}$/;


const mediaItemSchemaJoi = Joi.object({
    rating: Joi.number().required(),
    source: Joi.string().uri().required(), // перевірка на валідний URL
    tag: Joi.string().required(),
    artist: Joi.string().required()
  });
  
  // Валідація для mediaTutorialSchema
  const mediaTutorialSchemaJoi = Joi.object({
    // type: Joi.string().valid('intro', 'verse', 'chorus', 'bridge', 'outro').required(),
    type: Joi.string().required(),
    list: Joi.array().items(
      Joi.object({
        rating: Joi.number().required(),
        source: Joi.string().uri().required()
      })
    ).default([]) // порожній масив за замовчуванням
  });
  
  // Валідація для mediaKeySchema
  const mediaKeySchemaJoi = Joi.object({
    audio: Joi.array().items(mediaItemSchemaJoi).default([]),
    video: Joi.array().items(mediaItemSchemaJoi).default([]),
    tutorials: Joi.array().items(mediaTutorialSchemaJoi)
  });
  


const addSongSchema = Joi.object({
  song_id: Joi.string().required(),
  title: Joi.string().required(),
  title_en: Joi.string().required(),
  language: Joi.string().valid('ukr', 'rus').required(),
  artist: Joi.string().required(),
  meta: Joi.object({
    key: Joi.string().required(),
    firstChord: Joi.string().allow(''),
    bpm: Joi.string().pattern(bpmReg).required()
      .messages({ 'string.pattern.base': 'bpm must be in format "137,00" or "68,50' }),
    timeSig: Joi.string().pattern(timeSigReg).required()
      .messages({ 'string.pattern.base': 'timeSig must be in format "4/4"' }),
    songMap: Joi.array().items(
    Joi.string().valid('intro', 'verse', 'chorus', 'bridge', 'outro')
    ).default([])
  }).required(),
  lyrics: Joi.array().items(
    Joi.object({
      title: Joi.string().allow(''),
      text: Joi.string().allow(''),
      chords: Joi.string().allow('')
    })
  ).min(1).required()
    .messages({ 'array.min': 'At least one lyrics section is required' }),
  media: Joi.object().pattern(
    Joi.string(),  // ключі можуть бути будь-якими рядками
    mediaKeySchemaJoi // значення відповідатимуть схемі mediaKeySchema
    ),  // обов'язкове поле
  info: Joi.string(),
  banner: Joi.string().uri()
});

module.exports = {
    addSongSchema,
}