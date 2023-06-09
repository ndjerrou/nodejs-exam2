const express = require('express');

const {
    getBooks,
    getOneBook,
    addOneBook,
    updateOneBook,
    deleteOneBook,
} = require('./books.controller');
const verifyPayload = require('../../midllewares/verifyPayload');

const router = express.Router();

router.route('').get(getBooks).post(verifyPayload, addOneBook);

router
  .route('/:id')
  .get(getOneBook)
  .put(updateOneBook)
  .delete(deleteOneBook);

module.exports = router;
