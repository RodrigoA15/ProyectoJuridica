import { Router } from "express";
import {
  getAllRespuestas,
  createRespuesta,
} from "../../controllers/RespuestaRadicados/respuestaController.js";

const router = Router();

router.get("/respuestas", getAllRespuestas);
router.post("/create_respuestas", createRespuesta);

export default router;
