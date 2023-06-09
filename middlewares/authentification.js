/**
 * Créer un middleware d'authentification pour protéger 
 * l'accès à certaines routes (seulement la route DELETE). 
 * Il devrait fonctionner comme suit : req.user doit être 
 * renseigné pour accéder au point d'accès. 
 * Sinon, nous renvoyons une erreur au client.
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