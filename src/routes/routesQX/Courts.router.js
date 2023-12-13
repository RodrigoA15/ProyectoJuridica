import * as CourtController from "../../controllers/ControllersQX/CourtController.js";
import { Router } from "express";

const router = Router();

//allCourts
router.get("/allCourts", CourtController.allCourts);
//CourtById
router.get("/oneCourt/:DESC_ENTE_JURIDICO", CourtController.courtById);
////number of request courts
router.get("/countreqcourts", CourtController.countRequestCourts);
export default router;
