/**
 * Implémenter un middleware de journalisation 
 * qui enregistre les détails de chaque requête entrante 
 * (intention, point d'accès ciblé, nom d'hôte de la requête au minimum).
 */

const { writeData } = require('./utils/files');

/**
 * Middleware de journalisation pour enregistrer les détails de chaque requête entrante.
 * @param {Object} req - L'objet requête.
 * @param {Object} res - L'objet réponse.
 * @param {Function} next - La fonction suivante dans la chaîne de middleware.
 */
module.exports = (req, res, next) => {
 //Je mets dans une constante l'objet de la requete en le destructurant
  const { method, originalUrl, hostname } = req;
  // Enregistrer les détails de la requête
  const logEntry = {
    timestamp: new Date().toISOString(),
    method,
    url: originalUrl,
    hostname
  };
  //sauvegarder dans le fichier journal.json
  writeData('journal.json', logEntry);
  // Passer au middleware ou à la route suivante
  next();
};

