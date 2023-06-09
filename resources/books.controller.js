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
        //pagination des résultat
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);


        const start = (page - 1) * limit;
        const end = page * limit;
        const booksPage = books.slice(start, end);
        //Pour que ça fonctionne il faudra fournir une limite et une page, sinon tous les livres sont renvoyés.
        //exemple: http://localhost:9000/api/v1/books?limit=2&page=3
        res.send({
            books: books.length,
            pages: Math.ceil(books.length / limit),
            currentPage: page,
            objects: !page || !limit ? books :  booksPage
        })
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