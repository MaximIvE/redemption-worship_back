const { Schema, model } = require('mongoose');

const timeSigReg = /^\d{1,2}\/\d{1,2}$/;
const bpmReg = /^\d{1,3},\d{2}$/;

const lyricsSchema = new Schema({
  title: { type: String },
  text: { type: String },
  chords: { type: String }
}, { _id: false });

const songSchema = new Schema({
  song_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  title_en: { type: String, required: true },
  language: { type: String, required: true, enum: ['ukr', 'rus'] },
  artist: { type: String, required: true },
  meta: {
    key: { type: String, required: true },
    firstChord: String,
    bpm: { type: String, required: true, match: [bpmReg, 'Invalid bpm signature format (use e.g. "68,50, "137,00")'] },
    timeSig: { type: String, required: true, match: [timeSigReg, 'Invalid time signature format (use e.g. "4/4", "6/8")'] }
  },
  lyrics: {
    type: [lyricsSchema],
    required: true,
    validate: [arr => arr.length > 0, 'At least one lyrics item is required']
  },
  
  info: String,
  banner: String
});

module.exports = model('song', songSchema);
