const axios = require("axios");
const library = require("../library.json");
const { v4: uuidv4 } = require("uuid");
const { writeData } = require("../utils/writeData");

const dataName = "library.json";
const Books = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { order } = req.query;
    const { auteur, titre, nationalite } = req.query;
    let books = [...library];

    // Filtrage par auteur titre et nationalite si query
    if (auteur) {
      books = books.filter((book) => book.auteur === auteur);
    }
    if (titre) {
      books = books.filter((book) => book.titre === titre);
    }
    if (nationalite) {
      books = books.filter((book) => book.nationalite === nationalite);
    }

    let paginatedBooks = books;

    if (page && limit) {
      const startIndex = (parseInt(page) - 1) * parseInt(limit);
      const endIndex = startIndex + parseInt(limit);
      paginatedBooks = books.slice(startIndex, endIndex);
    }

    res.status(200).send(paginatedBooks);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const Book = (req, res) => {
  try {
    const book = req.book;
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addBooks = async (req, res) => {
  try {
    const { titre, auteur, nationalite } = req.body;
    const id = uuidv4();
    let book = {
      id: id,
      titre: titre,
      auteur: auteur,
      nationalite: nationalite,
    };
    let content = [...library, book];
    await writeData(dataName, content);
    res.send({ message: "Livre ajouté avec succès", book });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateBooks = (req, res) => {
  try {
    const { titre, auteur, nationalite } = req.body;
    const book = req.book;
    // Mise ne place des élèments a modifié
    if (book.titre !== titre && titre !== undefined) {
      book.titre = titre;
    }
    if (book.auteur !== auteur && auteur !== undefined) {
      book.auteur = auteur;
    }
    if (book.nationalite !== nationalite && nationalite !== undefined) {
      book.nationalite = nationalite;
    }
    const del = library.filter((elm) => elm.id !== book.id);
    const content = [...del, book];
    writeData(dataName, content);
    res.send("Livre mis à jour avec succès");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteBooks = async (req, res) => {
  try {
    const { id } = req.body;
    const content = library.filter((book) => book.id !== id);
    writeData(dataName, content);
    res.send("Livre supprimé avec succès");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { addBooks, updateBooks, deleteBooks, Books, Book };
