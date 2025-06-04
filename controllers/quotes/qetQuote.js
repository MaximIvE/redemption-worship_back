const { RequestError } = require("../../helpers");
const { Quote } = require("../../models/quote");


// Отрмуємо цитату даного тижня. Якщо її немає, то отримаємо першу вільну цитату і записуємо в неї поточний тиждень.
const getQuote = async (req, res) => {

    const {week} = req.params;   //Номер тижня
    const { current } = req.query;   //Чи встановлює поточний тиждень у вільний екземпляр в разі незнаходження поточного.

    // Цитата поточного тижня АБО Цитата без поля week.
    let data = await Quote.findOne({week}).select('-_id');

    if(!data) {
        if(current === "true"){
            const newData = await Quote.findOne({week: { $exists: false }});
            if(!newData) {
                throw RequestError(404);
            }else{
                data = await Quote.findByIdAndUpdate({ _id: newData._id }, {week},{new: true}).select('-_id');
                if (!data) throw RequestError(500);
            }
        }else{
            throw RequestError(404);
        }
    };
    
    res.json(data);
};

module.exports = getQuote;