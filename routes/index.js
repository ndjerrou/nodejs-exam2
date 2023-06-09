const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBook);
router.post('/books', bookController.postBook);
router.put('/books/:id', bookController.putBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
