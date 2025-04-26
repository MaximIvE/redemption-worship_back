// Функція розділяє назву пісні зі списка пісень на складові: українську назву, англійську назву (якщо є) та мову перекладу (відображення)
// Рядок має вигляд "Укр Назва _ English Name [UKR].docx" або "Укр Назва [UKR].docx"
//Сюди приходять всі назви з розширенням ".docx"

const separateOfName = song => {

    const [part1, other] = song.name.replace(".docx", "").split(" _ ");
    const [part2, lang] = (other || part1).split("[");
    const textLang = lang.replace("]", "").toLowerCase();

    let name, name_en;
    if (other){
        name = part1.trim();
        name_en = part2.trim();
    } else{
        name = part2.trim();
        name_en = "";
    }
  
    return {
        id: song.id,
        name,
        name_en,
        textLang,
    }
}

module.exports = separateOfName;