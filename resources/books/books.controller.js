const { writeData, readData } = require('../../utils/files');

module.exports = {
    // Get every book
    getBooks(req, res) {
        const books = readData();

        res.send(books);
    },

    // Get one book with its ID
    getOneBook(req, res) {
        const books = readData();

        const { id } = req.params;

        const book = books.find((book) => book.id === +id);

        if (!book)
            return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

        res.send(book);
    },

    // Add one book to database
    addOneBook(req, res) {
        const books = readData();
        console.log("add");

        const book = { ...req.body, id: books.length + 1 };

        books.push(book);

        writeData(books);

        res.status(201).send({ ok: true, data: book });
    },

    // Update one book with its ID
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

    // Delete one book with its ID
    deleteOneBook(req, res) {
        const books = readData();

        const { id } = req.params;

        const book = books.find((book) => book.id === +id);

        if (!book)
            return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

        const idx = books.findIndex((book) => book.id === +id);

        const deletedBook = books.splice(idx, 1);

        writeData(books);

        res.send({ ok: true, data: deletedBook });
    },
};
