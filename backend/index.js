import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

connectDb();

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});