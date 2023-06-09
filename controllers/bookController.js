const { readFile, writeFile } = require('../utils/fileOps');
const { bookSchema } = require('../models/book');

// get books
exports.getBooks = (req, res) => {
    readFile(data => {
        res.send(data.books);
    }, true, 'db.json');
};

// get one book
exports.getBook = (req, res) => {
    readFile(data => {
        const bookId = req.params.id;
        const book = data.books.find(b => b.id == bookId);

        if (!book) {
            return res.status(404).send('Book not found');
        }

        res.send(book);
    }, true, 'db.json');
};

// add a new book
exports.postBook = (req, res) => {
    readFile(data => {
        const newBook = {
            id: data.books.length + 1,
            title: req.body.title,
            author: req.body.author,
            nationality: req.body.nationality
        };

        // validate the book data
        const { error } = bookSchema.validate(newBook);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        data.books.push(newBook);

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send('New book added');
        }, 'db.json');
    }, true, 'db.json');
};

// update a book
exports.putBook = (req, res) => {
    readFile(data => {
        const bookId = req.params.id;
        const bookIndex = data.books.findIndex(b => b.id == bookId);

        if (bookIndex === -1) {
            return res.status(404).send('Book not found');
        }

        const updatedBook = {
            id: bookId,
            title: req.body.title,
            author: req.body.author,
            nationality: req.body.nationality
        };

        // validate the updated book data
        const { error } = bookSchema.validate(updatedBook);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // replace the book in the array with the updated book
        data.books[bookIndex] = updatedBook;

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`Book id:${bookId} updated`);
        }, 'db.json');
    }, true, 'db.json');
};

// Delete a book
exports.deleteBook = (req, res) => {
    readFile(data => {
        const bookId = req.params.id;
        const bookIndex = data.books.findIndex(b => b.id == bookId);

        if (bookIndex === -1) {
            return res.status(404).send('Book not found');
        }

        // Remove the book from the array
        data.books.splice(bookIndex, 1);

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`Book id:${bookId} removed`);
        }, 'db.json');
    }, true, 'db.json');
};
