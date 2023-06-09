import { Router } from "express";
import { signup, login } from "../controllers/user.js";
import { verifyUser } from "../middlewares/verifyPayload.js";

const router = Router();

router.post("/signup", verifyUser, signup);
router.post("/login", login);

export default router;
