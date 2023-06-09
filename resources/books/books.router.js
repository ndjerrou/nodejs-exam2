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

router.route('/').get(getBooks)
// router.route('/test').get(getBooks)
router.route('/addBook').post(verifyPayload, addOneBook);


router
  .route('/book/:id')
  .get(getOneBook)
  .put(verifyPayload, updateOneBook)
  .delete(deleteOneBook);

module.exports = router;
