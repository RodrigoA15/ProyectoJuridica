import { Router } from "express";

import * as AsuntoController from "../../controllers/Asunto/asuntoController.js";
import { authRequired } from "../../middlewares/validateToken.js";

const router = Router();

//Asunto>>>>>>>
router.get("/asunto", AsuntoController.getAsunto);
router.post("/asunto", authRequired, AsuntoController.createAsunto);
router.get("/asunto/:id_asunto", authRequired, AsuntoController.getAsuntoById);
router.put("/asunto/:id_asunto", authRequired, AsuntoController.updateAsunto);
router.delete(
  "/asunto/:id_asunto",
  authRequired,
  AsuntoController.deleteAsunto
);

export default router;
