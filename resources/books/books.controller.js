const { writeData, readData } = require('../../utils/files');

module.exports = {
  addOneBook(req, res) {
    const books = readData();

    const book = { ...req.body, id: books.length + 1 };

    books.push(book);

    writeData(books);

    res.status(201).send({ ok: true, data: book });
  },
  getBooks(req, res) {
    const books = readData();

    console.log(req)

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

    const book = books.find((book) => book.id === +id);

    if (!book)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

    for (let key in req.body) {
      book[key] = req.body[key];
    }

    const idx = books.findIndex((book) => book.id === +id);

    books.splice(idx, 1, book);

    writeData(books);

    res.send({ ok: true, data: book });
  },
  deleteOneBook(req, res) {
    const books = readData();

    const { id } = req.params;

    const book = books.find((book) => book.id === +id);

    if (!book)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

    const idx = books.findIndex((book) => book.id === +id);

    const deletedbook = books.splice(idx, 1);

    writeData(books);

    res.send({ ok: true, data: deletedbook });
  },
};
