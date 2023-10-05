import { Router } from "express";
import {
  getAllRespuestas,
  createRespuesta,
  savedFilePDF,
  respuestasporRadicado,
} from "../../controllers/RespuestaRadicados/respuestaController.js";

const router = Router();

router.get("/respuestas", getAllRespuestas);
router.post("/create_respuestas", createRespuesta);
//ruta para guardar archivos pdf
router.post("/filepdf", savedFilePDF);
//
router.get("/radicados_respuestas/:numero_radicado", respuestasporRadicado);

export default router;
