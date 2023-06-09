const express = require('express');
const bookController = require('./controllers/bookController');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const errorHandler = require('./middleware/errorHandler');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const validateBookData = require('./middleware/validationMiddleware');
const fs = require('fs');

// Générer la clé de sécurité s'il n'existe pas
const generateSecurityKey = () => {
  const key = process.env.SECURITY_KEY || 'my-default-key';
  fs.writeFileSync('secret.key', key);
};

// Vérifier si la clé de sécurité existe
const checkSecurityKey = () => {
  if (!fs.existsSync('secret.key')) {
    generateSecurityKey();
  }
};

// Vérifier la clé de sécurité au démarrage du serveur
checkSecurityKey();

const app = express();

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.get('/books', bookController.getAllBooks);
app.get('/books/:id', bookController.getBookById);
app.post('/books', validateBookData, bookController.addBook);
app.put('/books/:id', validateBookData, bookController.updateBook);
app.delete('/books/:id', authenticationMiddleware, bookController.deleteBook);

// Middleware de gestion des erreurs
app.use(errorHandler);

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
