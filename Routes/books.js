const express = require("express");
const router = express.Router();

const controller = require("../Controllers/books");

// router.get("/books")(controller.addBooks).post(controller.addBooks);

router
  .route("/books")
  .get(controller.Books)
  .post(controller.addBooks)
  .put(controller.updateBooks)
  .delete(controller.deleteBooks);

router.get("/book/:id", controller.Book);

module.exports = router;
