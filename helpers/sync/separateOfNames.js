// Функція розділяє назву пісні зі списка пісень на складові: українську назву, англійську назву (якщо є) та мову перекладу (відображення)
// Рядок має вигляд "Укр Назва _ English Name [UKR].docx" або "Укр Назва [UKR].docx"
//Сюди приходять всі назви з розширенням ".docx"

const separateOfNames = songs => {
    const newNames = songs.map(song => {
        const [part1, other] = song.name.replace(".docx", "").split(" _ ");
        const [part2, lang] = (other || part1).split("[");
        const language = lang.replace("]", "").toLowerCase();
    
        let title, title_en;
        if (other){
            title = part1.trim();
            title_en = part2.trim();
        } else{
            title = part2.trim();
            title_en = "";
        }
      
        return {
            song_id: song.id,
            title,
            title_en,
            language,
        }
    });

    return newNames
}

module.exports = separateOfNames;