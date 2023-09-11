import express from "express";
import morgan from "morgan";
import routes from "./src/routes/router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routes);

export default app;
