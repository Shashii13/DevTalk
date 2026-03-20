import express from "express";
import { signUp, login } from "../controllers/auth.controllers.js";
import { signUp, login, logOut } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logOut);

export default router;