import { Router } from "express";
import * as EstadoController from "../../controllers/EstadoRadicados/estadoRdos.controller.js";

const router = Router();

router.post("/estado", EstadoController.createEstado);

export default router;
