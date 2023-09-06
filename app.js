import express from "express";
import morgan from "morgan";
import routes from "./src/routes/router.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", routes);

export default app;
