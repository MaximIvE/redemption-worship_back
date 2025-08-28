// export function hasChords(lyrics){
//     if(!Array.isArray(lyrics)) return false;
//     return lyrics.some( item => item?.lines.some(line => line?.chords && line.chords.length > 0))
// }

export function hasChords() {
  return this.lyrics?.some(
    item => item.lines?.some(line => line.chords && line.chords.length > 0)
  );
}