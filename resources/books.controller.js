const { writeData, readData } = require('../utils/files');

module.exports = {
    addBook: (req, res) => {
        const books = readData();
        const book = { ...req.body, id: books.length + 1 };


        books.push(book);
        writeData(books);

        res.status(201).send({ ok: true, data: book })
    },
    getBooks: (req, res) => {
        const books = readData();
        res.send(books);
    },
    getBook: (req, res) => {
        const { id } = req.params;
        const books = readData();

        const book = books.find(book => book.id === +id);

        if (!book)
            res.status(404).send({ ok: false, msg: 'Invalid Id provided.' });
        res.send(book)

    },
    updateBook: (req, res) => {
        const books = readData();
        const { id } = req.params;

        const book = books.find(book => book.id === +id);

        if (!book)
            return res.status(404).send({ ok: false, msg: 'Invalid Id provided' });

        const idx = books.findIndex(book => book.id === +id);
        books.splice(idx, 1);


        books.push({ ...req.body, id: parseInt(id) });

        writeData(books)
        res.send({ ok: true, data: req.body });


    },
    deleteBook: (req, res) => {
        const books = readData();
        const { id } = req.params;
        const book = books.find(book => book.id === +id);

        if (!book)
            return res.status(404).send({ ok: false, msg: 'Invalid id provided.' });

        const idx = books.findIndex(book => book.id === +id);
        const deleteBooks = books.splice(idx, 1);

        writeData(books);

        res.send({ ok: true, data: deleteBooks });
    },
}