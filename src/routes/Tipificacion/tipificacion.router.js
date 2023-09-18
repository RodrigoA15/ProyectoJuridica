import { Router } from "express";
import * as TipificacionController from "../../controllers/Tipificacion/tipificacionController.js";
import { authRequired } from "../../middlewares/validateToken.js";

const router = Router();

//Tipificacion>>>>>>>

router.get("/tipificacion", TipificacionController.getTipificacion);
router.post(
  "/tipificacion",
  authRequired,
  TipificacionController.createTipificacion
);
router.get(
  "/tipificacion/:id_tipificacion",
  authRequired,
  TipificacionController.getByIdTipificacion
);
router.put(
  "/tipificacion/:id_tipificacion",
  authRequired,
  TipificacionController.updateTipificacion
);
router.delete(
  "/tipificacion/:id_tipificacion",
  authRequired,
  TipificacionController.deleteTipificacion
);

export default router;
