const express = require("express");
const router = express.Router();

const controller = require("../Controllers/books");
const {
  verifaddBook,
  verifid,
  existBook,
} = require("../Middlewares/verifBook");

router
  .route("/books")
  .get(controller.Books)
  .post(verifaddBook, controller.addBooks)
  .put(verifid, existBook, controller.updateBooks)
  .delete(verifid, existBook, controller.deleteBooks);

router.get("/books/:id", existBook, controller.Book);

module.exports = router;
