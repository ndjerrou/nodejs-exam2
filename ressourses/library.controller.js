const { writeData, readData, fetchData } = require('../../utils/files');

/**
 * Contrôleur pour ajouter un livre
 * @param {Object} req - L'objet requête
 * @param {Object} res - L'objet réponse
 */
module.exports = {
  addOneBook(req, res) {
    const books = readData();

    const book = { ...req.body, id: books.length + 1 };

    books.push(book);

    writeData(books);

    res.status(201).send({ ok: true, data: book });
  },

  /**
   * Contrôleur pour obtenir tous les livres
   * @param {Object} req - L'objet requête
   * @param {Object} res - L'objet réponse
   */
  getBooks(req, res) {
    const books = readData();

    res.send(books);
  },

  /**
   * Contrôleur pour obtenir un livre spécifique
   * @param {Object} req - L'objet requête
   * @param {Object} res - L'objet réponse
   */
  getOneBook(req, res) {
    const books = readData();

    const { id } = req.params;

    const book = books.find((book) => book.id === +id);

    if (!book)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

    res.send(book);
  },

/**
 * Contrôleur pour mettre à jour un livre spécifique sans la méthode splice 
 * @param {Object} req - L'objet requête
 * @param {Object} res - L'objet réponse
 */
updateOneBook(req, res) {
  const books = readData();

  const { id } = req.params;

  const bookIndex = books.findIndex((book) => book.id === +id);

  if (bookIndex === -1) {
    return res.status(404).send({ ok: false, msg: 'Invalid id provided' });
  }

  const updatedBook = {
    ...books[bookIndex],
    ...req.body
  };

  const updatedBooks = [
    ...books.slice(0, bookIndex),
    updatedBook,
    ...books.slice(bookIndex + 1)
  ];

  writeData(updatedBooks);

  res.send({ ok: true, data: updatedBook });
},


  /**
   * Contrôleur pour supprimer un livre spécifique
   * @param {Object} req - L'objet requête
   * @param {Object} res - L'objet réponse
   */
  deleteOneBook(req, res) {
    const books = readData();

    const { id } = req.params;

    const book = books.find((book) => book.id === +id);

    if (!book)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

    const idx = books.findIndex((book) => book.id === +id);

    const deletedBook = books.splice(idx, 1);

    writeData(books);

    res.send({ ok: true, data: deletedBook });
  },
};
