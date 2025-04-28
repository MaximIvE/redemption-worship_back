
const getHeader = lines => {
    const names = lines[0].split(' | ');
        const name = names[0];
        const name_en = names[1] ? names[1] : "";
    const artist = lines[1];
    const keys = lines[2].split(' ').map(line => line.trim()).filter(line => line !== '');
        const key = keys[1];
        const bpm = keys[3];
        const timeSig = keys[6];
    
        return {name, name_en, artist, key:{key, bpm, timeSig}}
}

const getSongContent = lyrics => {

    const content = [];
        let title = "";
        let text = "";
    lyrics.forEach(line => {
        const isTitle = line.includes(":");
        if (isTitle){
            if(title) {content.push({title, text})};
            title = line.replace(":", "").trim();
            text = "";
        }else{
            const br = text ? "\r\n" : ""
            text = text + br + line;
        }
    });

    return content;
};

const separateSong = (lines) => {
    const text = lines.split('\n\n').map(line => line.trim()).filter(line => line !== '');
    const header = getHeader(text);

    const lyrics = text.slice(3);
    const content = getSongContent(lyrics);
    
    return {...header, content}
};

module.exports = separateSong;