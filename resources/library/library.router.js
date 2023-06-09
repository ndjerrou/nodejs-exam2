const express = require('express');

const {
    addOneBook,
    getOneBook,
    getBooks,
    updateOneBook,
    deleteOneBook,
} = require('./library.controller');
const verifyPayload = require('../../middlewares/verifyPayload');

const router = express.Router();

router.route('/books').get(getBooks).post(verifyPayload, addOneBook);

router
    .route('/books/:id')
    .get(getOneBook)
    .put(updateOneBook)
    .delete(deleteOneBook);

module.exports = router;
