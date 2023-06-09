import {
    writeData,
    readData,
} from '../utils/fileFunctions.js';

export const getAllBooks = (req, res) => {

    const books = readData();
    console.log(typeof books);
    console.log(books);

    res.status(200).send(books)
}

export const getOneBook = (req, res) => {
    const {
        id
    } = req.params;

    const books = readData();
    console.log(typeof books);
    console.log(books)
    const book = books.filter((book) => book.id === parseInt(id, 10))

    res.status(200).send(book)
}

export const addOneBook = (req, res) => {

    const books = readData();

    const totalBooks = books.length;
    const book = {
        id: totalBooks + 1,
        ...req.body
    };

    books.push(book);
    writeData(books);

    res.status(201).send(book);
}

export const updateOneBook = (req, res) => {
    const {
        id
    } = req.params;

    const books = readData();

    const updatedBook = {
        id: parseInt(id, 10),
        ...req.body
    }
    const newBooks = books.filter((book) => book.id !== parseInt(id, 10))

    newBooks.push(updatedBook);
    writeData(newBooks);

    res.status(200).send(updatedBook);
}

export const deleteOneBook = (req, res) => {
    const {
        id
    } = req.params;

    const books = readData();

    const newBooks = books.filter((book) => book.id !== parseInt(id, 10))
    writeData(newBooks);

    res.status(200).send(`Book ${id} has been deleted.`);

}