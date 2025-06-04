const { RequestError } = require("../../helpers");
const getCurrentWeek = require("../../helpers/utils/getCurrentWeek")
const { Quote } = require("../../models/quote");


// Отрмуємо цитату даного тижня. Якщо її немає, то отримаємо першу вільну цитату і записуємо в неї поточний тиждень.
const getCurrentQuote = async (req, res) => {
    const currentWeek = getCurrentWeek();
    
    // Цитата поточного тижня АБО Цитата без поля week.
    const data = await Quote.findOne({ $or: [
        {week: currentWeek},
        {week: { $exists: false }} 
    ] }).sort({ week: -1});

    if(!data) throw RequestError(404);
        

    // Якщо запис з поточним тижнем не знайдено, то записуємо в знайдений статус поточний тиждень та змінюємо стутус;
    const currentData = !data.week ?   
        await Quote.findByIdAndUpdate({ _id: data._id }, {week: currentWeek},{new: true})
        : data;
    
    res.json(currentData);
};

module.exports = getCurrentQuote;