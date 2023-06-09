const fs = require('fs');

const adminMiddleware = async (req, res, next) => {

  if (!req.params.name) {
    res.status(401).send("Veuillez renseigner votre nom administrateur dans l'URL afin d'avoir accès à la suppression.");
    return;
  }

  try {
    const result = await fs.promises.readFile("./admin.json", 'utf8');
    // Parser le contenu JSON du fichier admin.json
    const admins = JSON.parse(result);
    // Vérifier si req.params.name correspond à l'une des valeurs des propriétés "name" des administrateurs
    const isAdmin = admins.find(admin => admin.name === req.params.name);

    if (isAdmin) {
      // L'utilisateur est un administrateur, passer au middleware suivant
      next();
    } else {
      // L'utilisateur n'est pas un administrateur, renvoyer une erreur d'accès non autorisé
      res.status(401).send({ status: 401, message: "Accès non autorisé" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: "Erreur interne du serveur" });
  }
};

module.exports = adminMiddleware;

