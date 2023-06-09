const { readFile, writeFile } = require('../utils/fileOps');
const { bookSchema } = require('../models/book');

// get books
exports.getBooks = (req, res) => {
    readFile(data => {
        const { books } = data;
        res.send(books);
    }, true, 'db.json');
};

// get one book
exports.getBook = (req, res) => {
    readFile(data => {
        const { id } = req.params;
        const { books } = data;
        const book = books.find(b => b.id == id);

        if (!book) {
            return res.status(404).send('Book not found');
        }

        res.send(book);
    }, true, 'db.json');
};

// add a new book
exports.postBook = (req, res) => {
    readFile(data => {
        const { title, author, nationality } = req.body;

        // Find the highest current id
        const highestId = data.books.reduce((maxId, book) => Math.max(maxId, book.id), 0);

        const newBook = {
            id: highestId + 1,
            title,
            author,
            nationality
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
        const id = Number(req.params.id);
        const { title, author, nationality } = req.body;
        const updatedBook = {
            id,
            title,
            author,
            nationality
        };

        // validate the updated book data
        const { error } = bookSchema.validate(updatedBook);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // find the index of the book with the provided id
        const bookIndex = data.books.findIndex(b => b.id === id);

        if (bookIndex === -1) {
            return res.status(404).send('Book not found');
        }

        // replace the book in the array with the updated book
        data.books[bookIndex] = updatedBook;

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`Book id:${id} updated`);
        }, 'db.json');
    }, true, 'db.json');
};

// Delete a book
exports.deleteBook = (req, res) => {
    readFile(data => {
        const { id } = req.params;
        // const bookId = req.params.id;
        const bookIndex = data.books.findIndex(b => b.id == id);

        if (bookIndex === -1) {
            return res.status(404).send('Book not found');
        }

        // Remove the book from the array
        data.books.splice(bookIndex, 1);

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`Book id:${id} removed`);
        }, 'db.json');
    }, true, 'db.json');
};
