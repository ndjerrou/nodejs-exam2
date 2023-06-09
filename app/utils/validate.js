import Joi from 'joi';

import {
  book,
  changeBook
} from './schema.js';

export const validateBookload = (req, res, next) => {
  const { body } = req;

  try {
    Joi.assert(body, book);
    next();
  } catch (e) {
    res.status(422).send({
      error: e.details[0].message
    });
  }
}
export const validateBookChangeload = (req, res, next) => {
  const { body } = req;

  try {
    Joi.assert(body, changeBook);
    next();
  } catch (e) {
    res.status(422).send({
      error: e.details[0].message
    });
  }
}