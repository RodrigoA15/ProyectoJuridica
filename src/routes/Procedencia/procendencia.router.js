import { Router } from "express";
import * as ProcendenciaController from "../../controllers/Procendencia/procedenciaController.js";
import { authRequired } from "../../middlewares/validateToken.js";

const router = Router();

//Procedencia
router.get("/procedencia", ProcendenciaController.getProcedencia);
router.post("/procedencia", ProcendenciaController.createProcedencia);
router.get(
  "/procedencias/:numero_identificacion",
  ProcendenciaController.getProcedenciaById
);

router.put(
  "/procedencia/:id_procedencia",
  authRequired,
  ProcendenciaController.updateProcedencia
);
router.delete(
  "/procedencia/:id_procedencia",
  authRequired,
  ProcendenciaController.deleteProcedencia
);

export default router;
