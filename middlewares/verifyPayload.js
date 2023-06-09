const Joi = require('joi');


module.exports = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });

  if (!req.body)
    return res.status(400).send({ ok: false, msg: 'Request must have a body' });

  const result = schema.validate(req.body);


  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ ok: false, msg: 'Request body cannot be empty' });
  }


  if (result.error)
    return res.status(400).send({ ok: false, msg: 'Request must have a title' });

  next();
};
