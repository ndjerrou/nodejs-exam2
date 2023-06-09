const express = require('express');

const {
  addOneBook,
  getOneBook,
  getBooks,
  updateOneBook,
  deleteOneBook,
} = require('./books.controller');
const verifyPayload = require('../../middlewares/verifyPayload');
const verifyRight = require('../../middlewares/verifyRight');

const router = express.Router();

router.route('/books').get(getBooks)
// router.route('/test').get(getBooks)
router.route('/addBook').post(verifyPayload, addOneBook);


router
  .route('/book/:id')
  .get(getOneBook)
  .put(verifyPayload, updateOneBook)
  .delete(verifyRight, deleteOneBook); // pas de systeme d'auth pour le moment, quote verify pour tester la route 

module.exports = router;
