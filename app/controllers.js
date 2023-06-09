import {
    writeData,
    readData,
} from '../utils/fileFunctions.js';

export const getAllBooks = (req, res) => {

    const books = readData();

    if (typeof books === 'string') {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    res.status(200).send(books)
}

export const getOneBook = (req, res) => {
    const {
        id
    } = req.params;

    const books = readData();

    if (typeof books === 'string') {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    const book = books.filter((book) => book.id === parseInt(id, 10))

    res.status(200).send(book)
}

export const addOneBook = (req, res) => {

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

    const books = readData();

    if (typeof books === 'string') {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    const updatedBook = {
        id: parseInt(id, 10),
        ...req.body
    }
    const newBooks = books.filter((book) => book.id !== parseInt(id, 10))

    newBooks.push(updatedBook);
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

    const books = readData();

    if (typeof books === 'string') {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    const newBooks = books.filter((book) => book.id !== parseInt(id, 10))
    const error = writeData(newBooks);

    if (error) {
        res.status(500).send('Error reading or writing to database');
        return;
    }

    res.status(200).send(`Book ${id} has been deleted.`);

}