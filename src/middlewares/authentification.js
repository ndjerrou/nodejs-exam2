/**
 * Créer un middleware d'authentification pour protéger 
 * l'accès à certaines routes (seulement la route DELETE). 
 * Il devrait fonctionner comme suit : req.user doit être 
 * renseigné pour accéder au point d'accès. 
 * Sinon, nous renvoyons une erreur au client.
 */

/**
 * Middleware d'authentification pour protéger l'accès à certaines routes.
 * Seuls les utilisateurs authentifiés peuvent accéder à toutes les routes,
 * sauf la route DELETE qui est interdite.
 * @param {Object} req - L'objet requête.
 * @param {Object} res - L'objet réponse.
 * @param {Function} next - La fonction suivante dans la chaîne de middleware.
 */
const authenticationMiddleware = (req, res, next) => {
    // Je vérifie si req.user est renseigné
    if (!req.user) {
      return res.status(401).send({ error: 'Authentification requise' });
    }
    // Je vérifie la méthode de la requête
    if (req.method === 'DELETE') {
      // L'utilisateur n'est pas autorisé à utiliser la méthode DELETE
      return res.status(403).send({ error: 'Accès interdit' });
    }
    // L'utilisateur est authentifié et peut accéder à la route
    next(); // Passer au middleware ou à la route suivante
  };
  