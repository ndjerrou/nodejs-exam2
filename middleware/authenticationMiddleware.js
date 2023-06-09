const fs = require('fs');

// Middleware pour vérifier l'authentification
function authenticate(req, res, next) {
  // Vérifier la clé de sécurité
  const secretKey = fs.readFileSync('secret.key', 'utf8');

  // Vérifier la présence de la clé dans l'en-tête de la requête
  const { authorization } = req.headers;
  if (authorization !== secretKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Authentification réussie
  next();
}

module.exports = authenticate;
