import { Router } from "express";

import { auth } from "../middlewares/auth.js";
import {
  getBooks,
  getOneBook,
  createBook,
  updateOneBook,
  deleteOneBook
} from "../controllers/book.js";
import { verifyBook } from "../middlewares/verifyPayload.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getOneBook);
router.post("/", verifyBook, createBook);
router.put("/:id", updateOneBook);
router.delete("/:id", auth, deleteOneBook);

export default router;
