import {
  BOOK_CREATED_SUCCESS,
  BOOK_DELETED_SUCCESS,
  BOOK_UPDATED_SUCCESS,
  ERROR_STATUS,
  INVALID_ID,
  SUCESS_STATUS,
} from "../constants.js";
import { writeData, readData } from "../utils/libraryFile.js";
import { LIBRARY_PATH } from "../constants.js";

export const createBook = (req, res) => {
  const books = readData(LIBRARY_PATH);

  const book = { ...req.body, id: books[books.length - 1].id + 1 };

  books.push(book);

  writeData(LIBRARY_PATH, books);

  res
    .status(201)
    .send({ state: SUCESS_STATUS, msg: BOOK_CREATED_SUCCESS, data: book });
};

export const getBooks = (req, res) => {
  const books = readData(LIBRARY_PATH);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filters = req.query;

  const filteredBooks = books.filter((book) => {
    let isValid = true;
    for (const el in filters) {
      isValid = isValid && book[el] == filters[el];
    }
    return isValid;
  });

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  res.send(currentBooks);
};

export const getOneBook = (req, res) => {
  const books = readData(LIBRARY_PATH);

  const { id } = req.params;

  const book = books.find((book) => book.id === +id);

  if (!book)
    return res
      .status(404)
      .send({ state: ERROR_STATUS, msg: INVALID_ID, data: book });

  res.send(book);
};

export const updateOneBook = (req, res) => {
  const books = readData(LIBRARY_PATH);

  const { id } = req.params;

  const book = books.find((book) => book.id === +id);

  if (!book)
    return res
      .status(404)
      .send({ state: ERROR_STATUS, msg: INVALID_ID, data: book });

  delete req.body.id;
  for (let key in req.body) {
    book[key] = req.body[key];
  }

  const index = books.findIndex((book) => book.id === +id);

  books[index] = book;

  writeData(LIBRARY_PATH, books);

  res.send({ state: SUCESS_STATUS, msg: BOOK_UPDATED_SUCCESS, data: book });
};

export const deleteOneBook = (req, res) => {
  const books = readData(LIBRARY_PATH);

  const { id } = req.params;

  const book = books.find((book) => book.id === +id);

  if (!book)
    return res.status(404).send({ state: ERROR_STATUS, msg: INVALID_ID });

  const idx = books.findIndex((book) => book.id === +id);

  const deletedbook = books.splice(idx, 1);

  writeData(LIBRARY_PATH, books);

  res.send({
    state: SUCESS_STATUS,
    msg: BOOK_DELETED_SUCCESS,
    data: deletedbook,
  });
};

