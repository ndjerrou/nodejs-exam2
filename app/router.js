import express from 'express';

import {validateBookload, validateBookChangeload} from "./utils/validate"

import {
   getBooks,
   getBook,
   postBook,
   putBook,
   deleteBook,
} from './controller.js';


export const router = express.Router();
router.route('/filter/:author').get(getBooks);
router.route('/:id').get(getBook);
router.route('/:id').put(validateBookChangeload, putBook); // add validation
router.route('/:id').delete(deleteBook);
router.route('').get(getBooks);
router.route('').post(validateBookload, postBook); // add validation