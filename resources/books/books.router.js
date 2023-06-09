const express = require('express');

const {
  addOneBook,
  getOneBook,
  getBooks,
  updateOneBook,
  deleteOneBook,
} = require('./books.controller');
const verifyPayload = require('../../middlewares/verifyPayload');

const router = express.Router();

router.route('/books').get(getBooks)
// router.route('/test').get(getBooks)
router.route('/addBook').post(verifyPayload, addOneBook);


router
  .route('/book/:id')
  .get(getOneBook)
  .put(updateOneBook) // middleware
  .delete(deleteOneBook);

module.exports = router;
