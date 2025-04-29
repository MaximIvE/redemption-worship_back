const Joi = require("joi");

const addSongSchema = Joi.object({
    title: Joi.string().required(),
    title_en: Joi.string().required()
})

module.exports = {
    addSongSchema,
}