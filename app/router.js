import express from 'express';

import {validateBookload, validateBookChangeload} from "./utils/validate.js"

import {
   getBooks,
   getBook,
   postBook,
   putBook,
   deleteBook,
} from './controller.js';


export const router = express.Router();

router.route('/:id').get(getBook);
//GET localhost:3000/books/:id

router.route('/:id').put(validateBookChangeload, putBook);
//PUT localhost:3000/books/:id
/*
{
   "title"?: "aa book", -- option
   "author"?: "author3",-- option
   "nationality?": "FR" -- option
}
*/

router.route('/:id').delete(deleteBook);
//DELETE localhost:3000/books/:id

router.route('').get(getBooks);
//GET localhost:3000/books?author=author3&page=0
// author & page optional

router.route('').post(validateBookload, postBook);
//POST localhost:3000/books
/*
{
   "title": "aa book",
   "author": "author3",
   "nationality": "FR"
}
*/
