const express = require('express');
const { addBook, getBook, getBooks, updateBook, deleteBook } = require('./books.controller');
const verifyPayload = require('../middlewares/verifyPayload');

const router = express.Router();

router.route('').get(getBooks).post(verifyPayload, addBook);

router.route('/:id').get(getBook).put(verifyPayload, updateBook).delete(deleteBook);

module.exports = router;
