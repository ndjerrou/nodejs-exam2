const Joi = require("joi");
const library = require("../library.json");

const verifaddBook = (req, res, next) => {
  const { titre, auteur, nationalite } = req.body;
  const schema = Joi.object({
    auteur: Joi.string().required(),
    titre: Joi.string().required(),
    nationalite: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  let message = "";
  if (titre === "" || titre === undefined) {
    message = "titre";
  }
  if (auteur === "" || auteur === undefined) {
    message = "auteur";
  }
  if (nationalite === "" || nationalite === undefined) {
    message = "nationalite";
  }
  if (result.error)
    return res
      .status(400)
      .send({ ok: false, massage: `Missing ${message} field` });
  next();
};

const verifid = (req, res, next) => {
  console.log("req.body: ", req.body);
  const schema = Joi.object({
    id: Joi.string().required(),
    auteur: Joi.string(),
    titre: Joi.string(),
    nationalite: Joi.string(),
  });
  const result = schema.validate(req.body);
  if (result.error)
    return res.status(400).send({ ok: false, massage: "Missing id fail" });
  next();
};

const existBook = (req, res, next) => {
  const { id: paramsid } = req.params;
  const { id: bodyid } = req.body;
  const book = library.find(
    (book) => book.id === paramsid || book.id === bodyid
  );
  if (!book) {
    res.status(400).send("OUPS ! The book does not exist");
  } else {
    req.book = book;
    next();
  }
};
module.exports = { verifaddBook, verifid, existBook };
