import express from 'express';

import {
  validatePayload
} from '../middlewares/payloadValidators.js';

import {
  getAllBooks,
  getOneBook,
  addOneBook,
  updateOneBook,
  deleteOneBook,
} from './controllers.js';

export const router = express.Router();

router
  .route('')
  .get(getAllBooks)
  .post(validatePayload, addOneBook);

router
  .route('/:id')
  .get(getOneBook)
  .put(validatePayload, updateOneBook)
  .delete(deleteOneBook);