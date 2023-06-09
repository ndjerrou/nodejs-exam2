const { writeData, readData } = require('../../utils/files');

module.exports = {
  addOneBook(req, res) {
    const books = readData();

    const idIndex = books.idIndex

    const book = { ...req.body, id: idIndex };

    books.idIndex = parseInt(idIndex) + 1

    books.books.push(book);

    writeData(books);

    res.status(201).send({ ok: true, data: book });
  },
  getBooks(req, res) {
    const books = readData();

    res.send(books);
  },
  getOneBook(req, res) {
    const books = readData();

    const { id } = req.params;

    const book = books.books.find((book) => {

      return book.id == id
    });

    if (!book)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

    res.send(book);
  },
  updateOneBook(req, res) {
    const books = readData();

    const { id } = req.params;

    const book = books.books.find((book) => book.id == id);

    if (!book)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

    req.body.id = id

    const newBooks = books.books.map((book) => {

      if (book.id == id) { return req.body }
      return book
    })


    writeData({ books: newBooks, idIndex: books.idIndex });

    res.send({ ok: true, data: newBooks });
  },
  deleteOneBook(req, res) {
    const books = readData();

    const { id } = req.params;
    const book = books.books.find((book) => {

      return book.id == id
    });



    if (!book)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

    const idx = books.books.findIndex((book) => book.id == id);

    const deletedbook = books.books.splice(idx, 1);

    writeData(books);

    res.send({ ok: true, data: deletedbook });
  },
};
