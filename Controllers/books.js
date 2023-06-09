const axios = require("axios");
const library = require("../library.json");
const { v4: uuidv4 } = require("uuid");
const { writeData } = require("../utils/writeData");
const { updateData } = require("../utils/updateData");
const { deleteData } = require("../utils/delete.data");

const Books = (req, res) => {
  try {
    res.send(library);
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
    await writeData(book, res);
    res.send("Livre ajouté avec succès");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateBooks = (req, res) => {
  try {
    const { titre, auteur, nationalite } = req.body;
    const book = req.book;

    if (book.titre !== titre && titre !== undefined) {
      book.titre = titre;
    }
    if (book.auteur !== auteur && auteur !== undefined) {
      book.auteur = auteur;
    }
    if (book.nationalite !== nationalite && nationalite !== undefined) {
      book.nationalite = nationalite;
    }
    updateData(book);
    res.send("Livre mis à jour avec succès");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteBooks = async (req, res) => {
  try {
    const { id } = req.body;
    await deleteData(id);
    res.send("Livre supprimé avec succès");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { addBooks, updateBooks, deleteBooks, Books, Book };
