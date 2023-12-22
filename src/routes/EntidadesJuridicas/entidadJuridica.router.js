import { Router } from "express";
import * as EntityCourt from "../../controllers/EntidadesJuridicas/Entidadjuridica.controller.js";

const router = Router();

router.get("/listEntities", EntityCourt.getAllEntities);
router.get("/listEntitiesbyid/:desc_ente_juridico/:municipio", EntityCourt.getEntityById);

router.post("/createEntity", EntityCourt.createEntity);

export default router;
