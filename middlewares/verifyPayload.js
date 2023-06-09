const Joi = require('joi');

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
