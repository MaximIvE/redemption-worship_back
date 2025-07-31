const { Schema, model } = require('mongoose');
const { handleSaveErrors } = require('../helpers');
const Joi = require("joi");

const bpmRegExp = /^\d{1,3},\d{2}$/;
const timeSigRegExp = /^\d{1,2}\/\d{1,2}$/;

const lyricsSchema = new Schema({
  title: { type: String},
  lines: { 
    type: [{
          text: {type: String, default: ""},
          chords: {type: String, default: ""}
        }]
  }
}, { _id: false });

const metaSchema = new Schema({
  key: { type: String, default: "" },
  firstChord: { type: String, default: "" },
  bpm: { type: String, match: bpmRegExp, default: "" },
  timeSig: { type: String, match: timeSigRegExp, default: "" },
  songMap: {type: [String], enum: ['intro', 'verse', 'chorus', 'bridge', 'outro'], default: [] }
}, { _id: false });

const bannerSchema = new Schema({
  _1x: {type: String, default: ""},
  _2x: {type: String, default: ""}
}, { _id: false })


    const mediaItemSchema = new Schema({
      rating: {type: Number, required: true},
      source: {type: String, required: true},
      tag: {type: String, required: true},
      artist: {type: String, required: true}
    }, { _id: false });

    const mediaTutorialSchema = new Schema({
      // type: {type: String, enum: ['intro', 'verse', 'chorus', 'bridge', 'outro']},
      type: {type: String},
      list: {
        type: [{
          rating: {type: Number, required: true},
          source: {type: String, required: true}
        }]
      }
    }, { _id: false });

    const mediaKeySchema = new Schema({
        audio: {type: [mediaItemSchema]},
        video: {type: [mediaItemSchema]},
        tutorials: {type: [mediaTutorialSchema]}
    },{ _id: false })


const songSchema = new Schema({
  song_id: { type: String, unique: true, required: true },
  title: { type: String, unique: true, required: true },
  title_en: { type: String, default: ""},
  language: { type: String, enum: ['ukr', 'rus'] },
  artist: { type: String, default: "" },

  meta: {type: metaSchema, default: {} },

  lyrics: {type: [lyricsSchema]},

  media: {type: Map, of: mediaKeySchema },
  
  info: { type: String, default: "" },
  banner: {type: bannerSchema}
}, { versionKey: false, timestamps: true});


songSchema.post('save', handleSaveErrors);
songSchema.post('insertMany', handleSaveErrors);

const Song = model('song', songSchema);

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
  

const createSongSchema = Joi.object({
  title: Joi.string().required().messages({"string.base": 'title should be a type of String', "any.required": "'title' is a required field"}),
  title_en: Joi.string(),
  language: Joi.string().valid('ukr', 'rus'),
  artist: Joi.string(),
  meta: Joi.object({
    key: Joi.string(),
    firstChord: Joi.string().allow(''),
    bpm: Joi.string().pattern(bpmRegExp)
      .messages({ "string.pattern.base": "bpm must be in format '137,00' or '68,50'" }),
    timeSig: Joi.string().pattern(timeSigRegExp)
      .messages({ "string.pattern.base": "timeSig must be in format '4/4'" }),
    songMap: Joi.array().default([])
  }),
  lyrics: Joi.array().items(
    Joi.object({
      title: Joi.string().allow(''),
      lines: Joi.array().items(
        Joi.object({
          text: Joi.string().allow(''),
          chords: Joi.string().allow('')
        })
      )
    })
  )
});

const createManySongsSchema = Joi.array().items(createSongSchema);

const updateSongSchema = Joi.object({
  song_id: Joi.string(),
  title: Joi.string(),
  title_en: Joi.string(),
  language: Joi.string().valid('ukr', 'rus'),
  artist: Joi.string(),
  meta: Joi.object({
    key: Joi.string(),
    firstChord: Joi.string().allow(''),
    bpm: Joi.string().pattern(bpmRegExp)
      .messages({ "string.pattern.base": "bpm must be in format '137,00' or '68,50'" }),
    timeSig: Joi.string().pattern(timeSigRegExp)
      .messages({ "string.pattern.base": "timeSig must be in format '4/4'" }),
    songMap: Joi.array().default([])
  }),
  lyrics: Joi.array().items(
    Joi.object({
      title: Joi.string(),
      lines: Joi.array().items(
        Joi.object({
          text: Joi.string(),
          chords: Joi.string()
        })
      )
    })
  ),
  media: Joi.object().pattern(
    Joi.string(),
    mediaKeySchemaJoi
    ),
  info: Joi.string(),
  banner: Joi.object({
    _1x: Joi.string(),
    _2x: Joi.string()
  })
});

const updateManySongsSchema = Joi.array().items(updateSongSchema);


const JoiSongs = {
  createSongSchema,
  createManySongsSchema,
  
  updateSongSchema,
  updateManySongsSchema
}

module.exports = Song;
module.exports = {
    Song,
    JoiSongs
}
