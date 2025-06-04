const {Schema, model} = require('mongoose');
const {handleSaveErrors } = require("../helpers");
const Joi = require("joi");


// Mongoose Schema
const quoteSchema = new Schema({
    verse:{type: String, required: true},
    place: {type: String, required: true, unique: true},
    banner: {type: String, required: true},
    week: {type: Number, min: 1, unique: true },
},{ versionKey: false, timestamps: true});

quoteSchema.post('save', handleSaveErrors);

const Quote = model("quote", quoteSchema);


//Joi Schemas
const createQuoteSchema = Joi.object({
    verse: Joi.string().required(),
    place: Joi.string().required(),
    banner: Joi.string().required(),
    week: Joi.number().min(1),
});

const updateQuoteSchema = Joi.object({
    verse: Joi.string(),
    place: Joi.string(),
    banner: Joi.string(),
    week: Joi.number().min(1),
});

const JoiQuote = {
    createQuoteSchema,
    updateQuoteSchema
}

module.exports = {
    Quote,
    JoiQuote
}