const Joi = require('joi');

/**
 * Middleware pour valider les paramètres de la requête
 * @param {Object} req - L'objet requête
 * @param {Object} res - L'objet réponse
 * @param {Function} next - Le prochain middleware à appeler
 */
module.exports = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    nationality: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error)
    return res.status(400).send({ ok: false, msg: 'Invalid parameters sent' });

  next();
};
