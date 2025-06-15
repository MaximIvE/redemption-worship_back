
const getHeader = lines => {
    const titles = lines[0].split(' | ');
        const title = titles[0];
        const title_en = titles[1] ? titles[1] : "";
    const artist = lines[1];
    const keys = lines[2].split(' ').map(line => line.trim()).filter(line => line !== '');
        const key = keys[1];
        const bpm = keys[3];
        const timeSig = keys[6];
    
        return {title, title_en, artist, meta:{key, bpm, timeSig}}
}

const getSongContent = lyrics => {
    const titleReg = /^[0-9]?[A-ZА-ЯІЇЄҐЁЪЬ0-9 xXХх:\t]*$/;
    const content = [];
        let title = "";
        let text = "";
    lyrics.forEach(line => {
        const isTitle = titleReg.test(line);
        if (isTitle){
            if(title) {content.push({title, text})};
            title = line.replace(":", "").trim();
            text = "";
        }else{
            const br = text ? "\r\n" : ""
            text = text + br + line;
        }
    });

    if (title) content.push({title, text});

    return content;
};

const separateSong = (lines) => {
    const text = lines.split('\n').map(line => line.trim()).filter(line => line !== '');
    const header = getHeader(text);

    const lyrics = text.slice(3);
    const content = getSongContent(lyrics);
    
    return {...header, lyrics: content}
};

module.exports = separateSong;