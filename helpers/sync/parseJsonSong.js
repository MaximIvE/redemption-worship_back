
const parseSong = (song) => {
    const result = song.reduce((res, line, )=>{
        const textArr = line.paragraph?.elements;
        if (!textArr) return res;
        textArr.forEach( el => {
            res = res + el.textRun.content;
        });
        return res;
    }, "");
    return result.replaceAll(/\n+/g, '\n');

};

module.exports = parseSong;