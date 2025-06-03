const {RequestError} = require("../../helpers/requestError");
const { Quote } = require("../../models/quote");


const addQuote = async(req, res) => {
    const result = await Quote.create(req.body);
    if(!result) throw RequestError(500);

    res.status(201).json(result)
};

module.exports = addQuote;