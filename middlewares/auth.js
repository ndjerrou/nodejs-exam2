import { verify } from "jsonwebtoken";
import { ERROR_STATUS, MISSING_TOKEN } from "../constants.js";

export const auth = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({
      state: ERROR_STATUS,
      message: MISSING_TOKEN,
    });

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = verify(token, process.env.RANDOM_TOKEN_SECRET);
    const id = decodedToken.id;
    req.auth = { id };

    next();
  } catch (error) {
    res.status(401).json({
      state: ERROR_STATUS,
      message: error,
    });
  }
};
