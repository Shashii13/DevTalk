import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { sendMessage } from "../controllers/message.controllers.js";
import { sendMessage, getMessages } from "../controllers/message.controllers.js";

const router = express.Router();

router.post("/send/:receiver", isAuth, upload.single("image"), sendMessage);
router.get("/get/:receiver", isAuth, getMessages);

export default router;