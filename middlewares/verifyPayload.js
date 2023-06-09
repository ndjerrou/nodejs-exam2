const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error)
    return res.status(400).send({ ok: false, msg: 'Request must have a title' });

  next();
};
