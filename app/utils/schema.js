import Joi from 'joi';

export const book = Joi.object({
    author: Joi.string().required(),
    title: Joi.string().required(),
    nationality: Joi.string().length(2).pattern(new RegExp('^[A-Za-z]{2}$')).required(),
})

export const changeBook = Joi.object({
    author: Joi.string(),
    title: Joi.string(),
    nationality: Joi.string().length(2).pattern(new RegExp('^[A-Za-z]{2}$')),
})