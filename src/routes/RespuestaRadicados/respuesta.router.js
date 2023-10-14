import { Router } from "express";
import {
  getAllRespuestas,
  createRespuesta,
  respuestasporRadicado,
  respuestasJuridica,
} from "../../controllers/RespuestaRadicados/respuestaController.js";
import { authRequired, isJuridica } from "../../middlewares/validateToken.js";

const router = Router();

router.get("/respuestas", getAllRespuestas);
router.post("/create_respuestas", createRespuesta);
//ruta para guardar archivos pdf
//
router.get("/radicados_respuestas/:numero_radicado", respuestasporRadicado);
//Listados de respuestas
router.get(
  "/respuestas_departamento/:id_departamento",
  authRequired,
  respuestasJuridica
);

export default router;
