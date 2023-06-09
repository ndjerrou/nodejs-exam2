import Joi from "joi";
import { ERROR_STATUS, INVALID_PARAMETERS } from "../constants.js";

export const verifyUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().required(),
  });

  handleError(schema, req, res, next);
};

export const verifyBook = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    author: Joi.string().max(50).required(),
    nationality: Joi.string().min(2).max(2).required(),
  });

  handleError(schema, req, res, next);
};

const handleError = (schema, req, res, next) => {
  const result = schema.validate(req.body);

  if (result.error)
    return res
      .status(400)
      .send({ state: ERROR_STATUS, msg: INVALID_PARAMETERS });

  next();
};
