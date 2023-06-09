//Par destructuration, je mets les méthodes writyeData et ReadData dans une constante
const { writeData, readData } = require('../utils/files');

/**
 * Contrôleur pour ajouter un livre
 * @param {Object} req - L'objet requête
 * @param {Object} res - L'objet réponse
 */
module.exports = {
  addOneBook(req, res) {
    //Je mets les livres lus du fichier json dans une constante
    const books = readData();
    //Je mets dans une constante le nouveau livre avec son nouvel identifiant
    const book = { ...req.body, id: books.length + 1 };
    //J'insère le nouveau livre dans la variable contenant tous les livres
    books.push(book);
    //Je sauvegarde dans le fichier json ma nouvelle bibliothèque
    writeData(books);
    //Je renvoie au client le nouveau livre
    res.status(201).send({ ok: true, data: book });
  },

  /**
   * Contrôleur pour obtenir tous les livres
   * @param {Object} req - L'objet requête
   * @param {Object} res - L'objet réponse
   */
  getBooks(req, res) {
    //Je mets les livres lus du fichier json dans une constante
    const books = readData();
    //Je renvoie au client tous les livres
    res.status(201).send({ ok: true, data: books });
  },

  /**
   * Contrôleur pour obtenir un livre spécifique
   * @param {Object} req - L'objet requête
   * @param {Object} res - L'objet réponse
   */
  getOneBook(req, res) {
    //Je mets les livres lus du fichier json dans une constante
    const books = readData();
    //Par destructuration, je met l'id du livre de la requête
    const { id } = req.params;
    //Je mets dans une constante le livre de la bibliothèque dont l'identifiant correspond à celui de la requête
    const book = books.find((book) => book.id === +id);
    //Si le livre n'est pas trouvé, alors reponse d'erreur, le processus s'arrête
    if (!book)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });
      //Le if précédent s'est bien passé, le livre est trouvé
      //Je renvoie au client le livre demandé
      res.status(201).send({ ok: true, data: book });
  },

/**
 * Contrôleur pour mettre à jour un livre spécifique sans la méthode splice 
 * @param {Object} req - L'objet requête
 * @param {Object} res - L'objet réponse
 */
updateOneBook(req, res) {
  //Je mets les livres lus du fichier json dans une constante
  const books = readData();
  //Par destructuration, je met l'id du livre de la requête
  const { id } = req.params;
   //Je mets dans une constante le livre de la bibliothèque dont l'identifiant correspond à celui de la requête
  const bookIndex = books.findIndex((book) => book.id === +id);
  //Si ce livre n'existe pas, est renvoyé un message d'erreur avec le statut correspondant. Le processus s'arrête.
  if (bookIndex === -1) {
    return res.status(404).send({ ok: false, msg: 'Invalid id provided' });
  }
  //Arrivé ici, le livre est trouvé
  //Je mets dans une constante un objet qui contient l'id du livre avec les données de la requête
  const updatedBook = {
    ...books[bookIndex],
    ...req.body
  };
  //J'insère le livre à sa place (numéro de l'id) dans books (cf plus haut)
  const updatedBooks = [
    ...books.slice(0, bookIndex),
    updatedBook,
    ...books.slice(bookIndex + 1)
  ];
  //Je sauvegarde la bibliothèque (dans books) mise à jour dans le fichier json
  writeData(updatedBooks);
  //Je renvoie la réponse
  res.send({ ok: true, data: updatedBook });
},


  /**
   * Contrôleur pour supprimer un livre spécifique
   * @param {Object} req - L'objet requête
   * @param {Object} res - L'objet réponse
   */
  deleteOneBook(req, res) {
    //Je mets les livres lus du fichier json dans une constante
    const books = readData();
    //Par destructuration, je met l'id du livre de la requête
    const { id } = req.params;
     //Je mets dans une constante le livre de la bibliothèque dont l'identifiant correspond à celui de la requête
    const book = books.find((book) => book.id === +id);
    //Si ce livre n'existe pas, est renvoyé un message d'erreur avec le statut correspondant. Le processus s'arrête.
    if (!book)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });
    //Je mets dans une constante le livre de la bibliothèque dont l'identifiant correspond à celui de la requête
    const idx = books.findIndex((book) => book.id === +id);
    //Je supprime le livre de la bibliothèque (avec la méthode splice parcequ'on a le droit ici)
    const deletedBook = books.splice(idx, 1);
     //Je sauvegarde la bibliothèque (dans books) mise à jour dans le fichier json
    writeData(books);
    // Je renvoie une confirmation de la suppression
    res.send({ ok: true, data: deletedBook });
  },
};
