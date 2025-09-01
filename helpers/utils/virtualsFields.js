const hasChords = function (){
  return this.lyrics?.some(
    item => item.lines?.some(line => line.chords && line.chords.length > 0)
  );
};

module.exports = hasChords;