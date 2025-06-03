const { RequestError } = require("../../helpers");
const getCurrentWeek = require("../../helpers/utils/getCurrentWeek")
const { Quote } = require("../../models/quote")

const getQuote = async (req, res) => {
    const currentWeek = getCurrentWeek();
    
    const data = await Quote.findOne({ week: { $in: [currentWeek, 0] } }).sort({ week: currentWeek > 0 ? -1 : 1 }); 
    if(!data) throw RequestError(404);

    if(data.week === 0) {
        Quote.findByIdAndUpdate(data._id, {week: currentWeek})
        data.week = currentWeek;
    };
    
    res.json({data});
};

module.exports = getQuote;