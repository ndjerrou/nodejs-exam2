import {
    writeData,
    readData,
} from '../utils/fileFunctions.js';
import {
    sortFunction,
    filterFunction
} from '../utils/filterSortFunctions.js';

export const getAllBooks = (req, res) => {
    // console.log(req.query);
    const {
        limit,
        author,
        title,
        nationality,
        sort
    } = req.query;
    // Tries to read database, returns an error if it can't
    const books = readData();
    if (typeof books === 'string') {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    const filteredBooks = filterFunction(books, {
        author,
        title,
        nationality
    });
    const sortedBooks = sortFunction(filteredBooks, sort);

    res.status(200).send(limit ? sortedBooks.slice(0, limit) : sortedBooks)
}

export const getOneBook = (req, res) => {
    const {
        id
    } = req.params;

    // Tries to read database, returns an error if it can't
    const books = readData();
    if (typeof books === 'string') {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    // Checks if the book we're trying to find exists
    const book = books.filter((book) => book.id === parseInt(id, 10))
    if (book.length > 0) {
        res.status(200).send(book)
    } else {
        res.status(404).send('This book doesn\'t exist');
    }
}

export const addOneBook = (req, res) => {

    // Tries to read database, returns an error if it can't
    const books = readData();
    if (typeof books === 'string') {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    const totalBooks = books.length;
    const book = {
        id: totalBooks + 1,
        ...req.body
    };
    books.push(book);

    // Tries to write to database, returns an error if it can't
    const error = writeData(books);
    if (error) {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    res.status(201).send(book);
}

export const updateOneBook = (req, res) => {
    const {
        id
    } = req.params;
    // Tries to read database, returns an error if it can't
    const books = readData();
    if (typeof books === 'string') {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    // Checks if the book we're trying to update exists
    const oldBook = books.filter((book) => book.id === parseInt(id, 10))
    if (oldBook.length === 0) {
        res.status(404).send('This book doesn\'t exist');
        return;
    }

    const updatedBook = {
        id: parseInt(id, 10),
        ...req.body
    }
    const newBooks = books.filter((book) => book.id !== parseInt(id, 10))
    newBooks.push(updatedBook);

    // Tries to write to database, returns an error if it can't
    const error = writeData(newBooks);
    if (error) {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    res.status(200).send(updatedBook);
}

export const deleteOneBook = (req, res) => {
    const {
        id
    } = req.params;

    // Tries to read database, returns an error if it can't
    const books = readData();
    if (typeof books === 'string') {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    // Checks if the book we're trying to delete exists
    const oldBook = books.filter((book) => book.id === parseInt(id, 10))
    if (oldBook.length === 0) {
        res.status(404).send('This book doesn\'t exist');
        return;
    }

    const newBooks = books.filter((book) => book.id !== parseInt(id, 10))

    // Tries to write to database, returns an error if it can't
    const error = writeData(newBooks);
    if (error) {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    res.status(200).send(`Book ${id} has been deleted.`);

}