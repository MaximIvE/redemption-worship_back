const { Schema, model } = require('mongoose');


const lyricsSchema = new Schema({
  title: { type: String},
  text: { type: String },
  chords: { type: String }
}, { _id: false });

const metaSchema = new Schema({
  key: { type: String },
  firstChord: { type: String },
  bpm: { type: String },
  timeSig: { type: String },
  songMap: {type: [String], enum: ['intro', 'verse', 'chorus', 'bridge', 'outro'], default: [] }
}, { _id: false });


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
        }],
        default: []
      }
    }, { _id: false });

    const mediaKeySchema = new Schema({
      type: { 
        audio: {type: [mediaItemSchema], default: []},
        video: {type: [mediaItemSchema], default: []},
        tutorials: {type: [mediaTutorialSchema]}
      }
    },{ _id: false })


// const mediaSchema = new Schema({
//   original: { type: mediaKeySchema, required: true },
// }, { _id: false });

const songSchema = new Schema({
  song_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  title_en: { type: String, required: true },
  language: { type: String, required: true, enum: ['ukr', 'rus'] },
  artist: { type: String },

  meta: {
    type: metaSchema,
    required: true
  },

  lyrics: {
    type: [lyricsSchema],
    required: true
  },

  media: {
    type: Map,
    of: mediaKeySchema
  },
  
  info: { type: String },
  banner: { type: String }
}, { versionKey: false });

const Song = model('song', songSchema);

module.exports = Song;
