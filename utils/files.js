const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '..', 'data', 'library.json');

/**
 * Fonction pour écrire les données dans le fichier
 * @param {Object} content - Les données à écrire dans le fichier
 */
function writeData(content) {
  try {
    fs.writeFileSync(booksPath, JSON.stringify(content));
  } catch (err) {
    console.error('Error writing file : ', err.message);
  }
}

/**
 * Fonction pour lire les données à partir du fichier
 * @returns {Array} - Les données lues à partir du fichier (tableau d'objets)
 */
function readData() {
  try {
    const books = fs.readFileSync(booksPath, 'utf-8');

    return JSON.parse(books); // string ==> Tableau JS
  } catch (err) {
    console.error('Error reading file : ', err.message);
  }
}

// Exportation des fonctions
module.exports = {
  writeData,
  readData
};
