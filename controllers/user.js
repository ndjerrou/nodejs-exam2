import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  EMAIL_ALREADY_USE,
  ERROR_STATUS,
  INVALID_LOGIN,
  SUCESS_STATUS,
  USER_CREATED_SUCCESS,
  USER_PATH,
} from "../constants.js";
import { v4 as uuidv4 } from "uuid";
import { writeData, readData } from "../utils/libraryFile.js";

dotenv.config();

export const signup = async (req, res) => {
  const users = readData(USER_PATH);

  if (!!users.find((el) => el.email === req.body.email))
    return res.status(409).send({
      state: ERROR_STATUS,
      msg: EMAIL_ALREADY_USE,
      data: { ...req.body },
    });

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = {
      id: uuidv4(),
      ...req.body,
      password: hash,
    };

    users.push(user);

    writeData(USER_PATH, users);

    res
      .status(201)
      .send({ state: SUCESS_STATUS, msg: USER_CREATED_SUCCESS, data: user });
  } catch (error) {
    res.status(500).json({ state: ERROR_STATUS, msg: error });
  }
};

export const login = async (req, res) => {
  const users = readData(USER_PATH);

  const user = users.find((el) => el.email === req.body.email);

  if (!user)
    return res.status(401).json({
      state: ERROR_STATUS,
      message: INVALID_LOGIN,
      data: { ...req.body },
    });

  try {
    const valid = await bcrypt.compare(req.body.password, user.password);

    !valid
      ? res.status(401).json({
          state: ERROR_STATUS,
          message: INVALID_LOGIN,
          data: { ...req.body },
        })
      : res.status(200).json({
          id: user.id,
          token: jwt.sign({ id: user.id }, process.env.RANDOM_TOKEN_SECRET, {
            expiresIn: "1h",
          }),
        });
  } catch (error) {
    res.status(500).json({
      state: ERROR_STATUS,
      message: error,
      data: { ...req.body },
    });
  }
};
