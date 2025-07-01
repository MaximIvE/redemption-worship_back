const getParts = (lines) => {
    const idx = lines.findIndex(line => /Key/i.test(line));

    return {
        headerPart: lines.slice(0,idx+1), 
        contentPart: lines.slice(idx+1)
    };
};

const getHeader = lines => {
    const cleanLines = lines.filter(line => line !== '');
    const keys = cleanLines[2].split(' ').map(line => line.trim()).filter(line => line !== '');

    return {
        title: cleanLines[0].split(' | ')[0], 
        title_en: cleanLines[0].split(' | ')[1],
        artist: cleanLines[1],
        meta: {
            key: keys[1],
            bpm: keys[3], 
            timeSig: keys[6]
        }}
}

const getContent = lyrics => {
    const titleReg = /^[0-9]?[A-ZА-ЯІЇЄҐЁЪЬ0-9 xXХх:\t]*$/;
    const content = [];
    let title = "";
    let text = "";

    const setContent = () => {
        text = text.replace(/^(\r\n)+|(\r\n)+$/g, '');
        content.push({title, text})
    };

    lyrics.forEach(line => {
        const isTitle = titleReg.test(line);
        if (line && isTitle){
            if(title) setContent();
            title = line.replace(":", "").trim();
            text = "";
        }else{
            text = text + "\r\n"+ line;
        }
    })

    if (title) setContent();

    return content;
};

const separateSong = (lines) => {
    const {headerPart, contentPart } = getParts(lines);

    const header = getHeader(headerPart);
    const content = getContent(contentPart);

    return {...header, lyrics: content}
};

module.exports = separateSong;