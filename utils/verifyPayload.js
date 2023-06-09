const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().min(0).max(100),
    title: Joi.string().min(1).max(50).required(),
    author: Joi.string().min(1).max(100).required(),
    price: Joi.number().required(),
    description: Joi.string().min(1).max(200).required(),
  });

  const result = schema.validate(req.body);

  if (result.error)
    return res.status(400).send({ ok: false, msg: 'Invalid parameters sent' });

  next();
};