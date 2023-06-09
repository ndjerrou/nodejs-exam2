const express = require('express');

const {
    addOneBook,
    getOneBook,
    getBooks,
    updateOneBook,
    deleteOneBook,
} = require('./library.controller');
const verifyPayload = require('../../middlewares/verifyPayload');
const log = require('../../middlewares/logger');

const router = express.Router();

router.route('/books').get(log, getBooks).post(log, verifyPayload, addOneBook);

router
    .route('/books/:id')
    .get(log,getOneBook)
    .put(log,updateOneBook)
    .delete(log,deleteOneBook);

module.exports = router;
