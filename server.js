const express = require('express');

const library = require('./resources/library/library.router');
const journal = require('./middlewares/journal');
const authentification = require('./middlewares/authentification');
const app = express();

/**
 * Middleware pour parser le corps de la requête en JSON
 */
app.use(express.json());

/**
 * Middleware pour gérer les routes relatives aux livres
 * Les routes relatives aux livres commenceront par "/api/v1/library"
 */
app.use('/api/v1/library', library);

/**
 * Middleware de journalisation
 */
app.use(journal);

/**
 * Middleware d'authentification
 */
app.use(authentification);
/**
 * Démarrage du serveur sur le port 3000
 */
app.listen(3000, () => console.log('Port 3000 on fire'));
