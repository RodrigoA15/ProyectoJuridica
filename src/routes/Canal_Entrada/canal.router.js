import { Router } from "express";
import * as CanalController from "../../controllers/CanalEntrada/canalController.js";
import { authRequired } from "../../middlewares/validateToken.js";

const router = Router();

//Canal Entrada>>>>>>>
router.get("/canal", CanalController.getCanal);
router.post("/canal", authRequired, CanalController.createCanal);
router.get("/canal/:id_canal", authRequired, CanalController.getCanalById);
router.put("/canal/:id_canal", authRequired, CanalController.updateCanal);
router.delete("/canal/:id_canal", authRequired, CanalController.deleteCanal);

export default router;
