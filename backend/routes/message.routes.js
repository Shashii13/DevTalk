import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { sendMessage } from "../controllers/message.controllers.js";

const router = express.Router();

router.post("/send/:receiver", isAuth, upload.single("image"), sendMessage);

export default router;