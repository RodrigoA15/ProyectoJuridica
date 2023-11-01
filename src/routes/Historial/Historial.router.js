import Router from "express";
import { createHistory } from "../../controllers/Historial/HistorialController.js";

const router = Router();

router.post("/historial", createHistory);

export default router;
