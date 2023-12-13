import { Router } from "express";
import {
  getAllRespuestas,
  createRespuesta,
  respuestasporRadicado,
  respuestasJuridica,
  // answersByUser,
  respuestasporRadicadoExcel,
  viewPDF,
} from "../../controllers/RespuestaRadicados/respuestaController.js";
import { authRequired, isJuridica } from "../../middlewares/validateToken.js";

const router = Router();

router.get("/respuestas", getAllRespuestas);
//ruta para guardar archivos pdf
router.post("/create_respuestas", createRespuesta);
//Ruta visualizar archivo
router.get("/view_respuestas", viewPDF);
router.get(
  "/radicados_respuestas/:id_departamento/:numero_radicado",
  respuestasporRadicado
);
//Listados de respuestas
router.get(
  "/respuestas_departamento/:id_departamento/:numero_radicado",
  authRequired,
  respuestasJuridica
);

router.get("/radicados_respuestas_excel", respuestasporRadicadoExcel);
//Respuestas por usuario>>>>>>
// router.get("/answeruser", answersByUser);

export default router;
