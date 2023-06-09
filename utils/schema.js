import Joi from 'joi';

export const schemaBook = Joi.object({
  title: Joi.string().required().pattern(new RegExp('[A-Za-z0-9]')),
  author: Joi.string().required().pattern(new RegExp('[A-Za-z0-9]')),
  nationality: Joi.string().required().pattern(new RegExp('[A-Za-z0-9]')),
})