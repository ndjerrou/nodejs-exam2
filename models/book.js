const Joi = require('joi');

const bookSchema = Joi.object({
    id: Joi.number(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    nationality: Joi.string().required()
});

module.exports = { bookSchema };
