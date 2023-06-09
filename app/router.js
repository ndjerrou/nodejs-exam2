import express from 'express';

import {
  getAllBooks,
  getOneBook,
  addOneBook,
  updateOneBook,
  deleteOneBook,
} from './controllers.js';

export const router = express.Router();

router.route('').get(getAllBooks).post(addOneBook);

router
  .route('/:id')
  .get(getOneBook)
  .put(updateOneBook)
  .delete(deleteOneBook);