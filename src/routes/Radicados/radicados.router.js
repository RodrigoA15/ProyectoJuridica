import { Router } from "express";
import * as RadicadosController from "../../controllers/Radicados/radicadoController.js";
import {
  authRequired,
  isJuridica,
  isAdmin,
} from "../../middlewares/validateToken.js";

const router = Router();

//Radicados>>>>>>>
router.get("/radicados", authRequired, RadicadosController.getRadicados);
router.post("/radicados", RadicadosController.createRadicados);
router.get(
  "/radicados/:id_radicado",
  authRequired,
  RadicadosController.getByIdRadicados
);
router.put(
  "/radicados/:id_radicado",
  authRequired,
  RadicadosController.updateRadicados
);
router.delete(
  "/radicados/:id_radicado",
  authRequired,
  RadicadosController.deleteRadicado
);
//Consulta por departamentos>>>>
router.get(
  "/depsistemas_radicados",
  authRequired,
  RadicadosController.departamentoRadicado
);

router.get(
  "/depjuridica_radicados",
  authRequired,
  isJuridica,
  RadicadosController.juridicaRadicado
);

router.get(
  "/juridica_respondidos",
  authRequired,
  isJuridica,
  RadicadosController.juridicaRadicadoRespondido
);

//AllRadicadosPendientes
router.get("/radicados_pendientes", RadicadosController.allRadicadosPendientes);
//AllRadicadosAsignados
router.get("/radicados_asignados", RadicadosController.allRadicadosAsignados);
//AllRadicadoRespuestas
router.get("/radicado_respuestas", RadicadosController.allRadicadosRespondidos);
export default router;
