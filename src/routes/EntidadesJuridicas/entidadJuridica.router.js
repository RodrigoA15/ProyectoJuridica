import { Router } from "express";
import * as EntityCourt from "../../controllers/EntidadesJuridicas/Entidadjuridica.controller.js";

const router = Router();

router.get("/listEntities", EntityCourt.getAllEntities);
router.get("/listEntitiesbyid/:runtentidad", EntityCourt.getEntityById);

router.post("/createEntity", EntityCourt.createEntity);

export default router;
