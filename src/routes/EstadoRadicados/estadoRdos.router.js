import { Router } from "express";
import * as EstadoController from "../../controllers/EstadoRadicados/estadoRdos.controller.js";
import * as RadicadoController from "../../controllers/Radicados/consultasEstado.js";

const router = Router();

router.post("/estado", EstadoController.createEstado);
//Radicados Preasignados >>>
router.get("/preasignados", RadicadoController.getAllPreAsignaciones);

export default router;
