import { Router } from "express";
import * as AsignacionController from "../../controllers/AsignacionPQRS/asignaciones.controller.js";
import { authRequired, isJuridica } from "../../middlewares/validateToken.js";

const router = Router();

router.get("/asignacion", AsignacionController.getAllAsignacion);
router.post("/asignacion", AsignacionController.createAsignacion);
router.get(
  "/asignaciones/:id_departamento",
  authRequired,
  AsignacionController.juridicaRadicadoAsignados
);

router.get(
  "/asignaciones1/:numero_radicado",
  AsignacionController.asignacionesById
);

export default router;
