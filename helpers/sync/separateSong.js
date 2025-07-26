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
<<<<<<< HEAD
        let title = "";
        let text = [];
    lyrics.forEach(line => {
        const isTitle = titleReg.test(line);
        if (isTitle){
            if(title) {content.push({title, lines: text.map(t => {return{text: t}})})};
=======
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
>>>>>>> f1e1b4b0e43e2b5ea37db07a0ade733c978afd06
            title = line.replace(":", "").trim();
            text = [];
        }else{
<<<<<<< HEAD
            text.push(line);
=======
            text = text + "\r\n"+ line;
>>>>>>> f1e1b4b0e43e2b5ea37db07a0ade733c978afd06
        }
    })

<<<<<<< HEAD
    if (title) {content.push({title, lines: text.map(t => {return{text: t}})})};
=======
    if (title) setContent();
>>>>>>> f1e1b4b0e43e2b5ea37db07a0ade733c978afd06

    return content;
};

const separateSong = (lines) => {
    const {headerPart, contentPart } = getParts(lines);

    const header = getHeader(headerPart);
    const content = getContent(contentPart);

    return {...header, lyrics: content}
};

module.exports = separateSong;