import { Router } from "express";
import * as EntidadController from "../../controllers/Entidad/EntidadController.js";
import { authRequired } from "../../middlewares/validateToken.js";

const router = Router();

//Entidad>>>>>>>>
router.get("/entidad", EntidadController.getEntidad);
router.post("/entidad", authRequired, EntidadController.createEntidad);
router.get(
  "/entidad/:id_entidad",
  authRequired,
  EntidadController.getEntidadById
);
router.put(
  "/entidad/:id_entidad",
  authRequired,
  EntidadController.updateEntidad
);
router.delete(
  "/entidad/:id_entidad",
  authRequired,
  EntidadController.deleteEntidad
);

export default router;
