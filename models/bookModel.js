const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const libraryFilePath = path.join(__dirname, '..', 'data', 'library.json');

// Récupérer les données de la bibliothèque depuis le fichier JSON
function getLibraryData() {
  const rawData = fs.readFileSync(libraryFilePath, 'utf8');
  return JSON.parse(rawData);
}

// Sauvegarder les données de la bibliothèque dans le fichier JSON
function saveLibraryData(data) {
  fs.writeFileSync(libraryFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Récupérer tous les livres
function getAllBooks(req, res) {
  const libraryData = getLibraryData();
  res.json(libraryData.books);
}

// Récupérer tous les livres avec pagination
function getAllBooks(req, res) {
  const { page = 1, perPage = 2 } = req.query;
  const skip = (page - 1) * perPage;
  const libraryData = getLibraryData();
  const totalBooks = libraryData.books.length;
  const books = libraryData.books.slice(skip, skip + Number(perPage));
  res.json({
    page: Number(page),
    perPage: Number(perPage),
    totalBooks,
    data: books,
  });
}

// Récupérer un livre par son ID
function getBookById(req, res) {
  const { id } = req.params;
  const libraryData = getLibraryData();
  const book = libraryData.books.find((book) => book.id === id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
}

// Ajouter un nouveau livre
function addBook(req, res) {
  const { title, author, nationality } = req.body;
  const libraryData = getLibraryData();
  const newBook = { id: uuidv4(), title, author, nationality };
  libraryData.books.push(newBook);
  saveLibraryData(libraryData);
  res.status(201).json({ message: 'Book added successfully' });
}

// Mettre à jour un livre existant
function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, nationality } = req.body;
  const libraryData = getLibraryData();
  const bookIndex = libraryData.books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    const updatedBook = { ...libraryData.books[bookIndex], title, author, nationality };
    libraryData.books[bookIndex] = updatedBook;
    saveLibraryData(libraryData);
    res.json({ message: 'Book updated successfully' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
}

// Supprimer un livre
function deleteBook(req, res) {
  const { id } = req.params;
  const libraryData = getLibraryData();
  const bookIndex = libraryData.books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    libraryData.books.splice(bookIndex, 1);
    saveLibraryData(libraryData);
    res.json({ message: 'Book deleted successfully' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
