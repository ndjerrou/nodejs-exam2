const fs = require("fs");

// Récupérer tous les livres
async function getAllBooks(req, res) {
  try {
    const libraryData = await fs.promises.readFile("data/library.json", "utf8");
    const books = JSON.parse(libraryData);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Récupérer tous les livres avec pagination
async function getAllBooks(req, res) {
  try {
    const libraryData = await fs.promises.readFile("data/library.json", "utf8");
    const books = JSON.parse(libraryData);

    const page = parseInt(req.query.page) || 1; // Page courante
    const perPage = parseInt(req.query.perPage) || 3; // Nombre de livres par page

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedBooks = books.slice(startIndex, endIndex);

    res.json(paginatedBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Récupérer tous les livres avec tri et filtrage
async function getAllBooks(req, res) {
  try {
    const { sortBy, filterByAuthor } = req.query;
    const libraryData = await fs.promises.readFile("data/library.json", "utf8");
    let books = JSON.parse(libraryData);

    // Filtrage par auteur
    if (filterByAuthor) {
      books = books.filter((book) =>
        book.author.toLowerCase().includes(filterByAuthor.toLowerCase())
      );
    }

    // Tri par titre
    if (sortBy === "title") {
      books.sort((a, b) => a.title.localeCompare(b.title));
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Récupérer un livre par son ID
async function getBookById(req, res) {
  const { id } = req.params;
  try {
    const libraryData = await fs.promises.readFile("data/library.json", "utf8");
    const books = JSON.parse(libraryData);
    const book = books.find((book) => book.id === id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Ajouter un nouveau livre
async function addBook(req, res) {
  const { title, author, nationality } = req.body;
  try {
    const libraryData = await fs.promises.readFile("data/library.json", "utf8");
    const books = JSON.parse(libraryData);
    const newBook = { title, author, nationality, id: generateUniqueId() };
    books.push(newBook);
    await fs.promises.writeFile("data/library.json", JSON.stringify(books), "utf8");
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Mettre à jour un livre existant
async function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, nationality } = req.body;
  try {
    const libraryData = await fs.promises.readFile("data/library.json", "utf8");
    const books = JSON.parse(libraryData);
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      const updatedBook = { title, author, nationality, id };
      books[bookIndex] = updatedBook;
      await fs.promises.writeFile("data/library.json", JSON.stringify(books), "utf8");
      res.json({ message: "Book updated successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Supprimer un livre
async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    const libraryData = await fs.promises.readFile("data/library.json", "utf8");
    const books = JSON.parse(libraryData);
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1);
      await fs.promises.writeFile("data/library.json", JSON.stringify(books), "utf8");
      res.json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Générer un identifiant unique sous forme de chaîne de caractères
function generateUniqueId() {
  return Date.now().toString();
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
