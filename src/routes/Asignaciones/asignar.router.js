import { Router } from "express";
import * as AsignacionController from "../../controllers/AsignacionPQRS/asignaciones.controller.js";

const router = Router();

router.get("/asignacion", AsignacionController.getAllAsignacion);
router.post("/asignacion", AsignacionController.createAsignacion);
router.get("/asignaciones", AsignacionController.juridicaRadicadoAsignados);

export default router;
