import Joi from 'joi';

import {
  schemaBook
} from '../utils/schema.js';

export const validatePayload = (req, res, next) => {
  const {
    body
  } = req;

  try {
    Joi.assert(body, schemaBook);
    next();
  } catch (e) {
    res.status(422).send({
      error: e.details[0].message
    });
  }
}