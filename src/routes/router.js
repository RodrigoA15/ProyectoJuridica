import { Router } from "express";
import {
  getDepartamento,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
  getDepartamentoById,
} from "../controllers/Departamento/departamentoController.js";

import * as RoleController from "../controllers/Roles/roleController.js";
import * as EntidadController from "../controllers/Entidad/EntidadController.js";
import * as AsuntoController from "../controllers/Asunto/asuntoController.js";
import * as CanalController from "../controllers/CanalEntrada/canalController.js";
import * as ProcendenciaController from "../controllers/Procendencia/procedenciaController.js";
import * as TipificacionController from "../controllers/Tipificacion/tipificacionController.js";
import * as RadicadosController from "../controllers/Radicados/radicadoController.js";
import * as Register from "../controllers/Auth/register.auth.js";

const router = Router();

//Departamentos>>>>>>>>>>
router.get("/departamento", getDepartamento);
router.post("/departamento", createDepartamento);
router.get("/departamento/:id_departamento", getDepartamentoById);
router.put("/departamento/:id_departamento", updateDepartamento);
router.delete("/departamento/:id_departamento", deleteDepartamento);

//Roles>>>>>>>>>>>>
router.get("/role", RoleController.getRoles);
router.post("/role", RoleController.createRole);
router.get("/role/:id_role", RoleController.getRoleById);
router.put("/role/:id_role", RoleController.updateRole);
router.delete("/role/:id_role", RoleController.deleteRole);

//Entidad>>>>>>>>
router.get("/entidad", EntidadController.getEntidad);
router.post("/entidad", EntidadController.createEntidad);
router.get("/entidad/:id_entidad", EntidadController.getEntidadById);
router.put("/entidad/:id_entidad", EntidadController.updateEntidad);
router.delete("/entidad/:id_entidad", EntidadController.deleteEntidad);

//Asunto>>>>>>>
router.get("/asunto", AsuntoController.getAsunto);
router.post("/asunto", AsuntoController.createAsunto);
router.get("/asunto/:id_asunto", AsuntoController.getAsuntoById);
router.put("/asunto/:id_asunto", AsuntoController.updateAsunto);
router.delete("/asunto/:id_asunto", AsuntoController.deleteAsunto);

//Canal Entrada>>>>>>>
router.get("/canal", CanalController.getCanal);
router.post("/canal", CanalController.createCanal);
router.get("/canal/:id_canal", CanalController.getCanalById);
router.put("/canal/:id_canal", CanalController.updateCanal);
router.delete("/canal/:id_canal", CanalController.deleteCanal);

//Procedencia
router.get("/procedencia", ProcendenciaController.getProcedencia);
router.post("/procedencia", ProcendenciaController.createProcedencia);
router.get(
  "/procedencia/:id_procedencia",
  ProcendenciaController.getProcedenciaById
);

router.put(
  "/procedencia/:id_procedencia",
  ProcendenciaController.updateProcedencia
);
router.delete(
  "/procedencia/:id_procedencia",
  ProcendenciaController.deleteProcedencia
);

//Tipificacion>>>>>>>

router.get("/tipificacion", TipificacionController.getTipificacion);
router.post("/tipificacion", TipificacionController.createTipificacion);
router.get(
  "/tipificacion/:id_tipificacion",
  TipificacionController.getByIdTipificacion
);
router.put(
  "/tipificacion/:id_tipificacion",
  TipificacionController.updateTipificacion
);
router.delete(
  "/tipificacion/:id_tipificacion",
  TipificacionController.deleteTipificacion
);

//Radicados>>>>>>>
router.get("/radicados", RadicadosController.getRadicados);
router.post("/radicados", RadicadosController.createRadicados);
router.get("/radicados/:id_radicado", RadicadosController.getByIdRadicados);
router.put("/radicados/:id_radicado", RadicadosController.updateRadicados);
router.delete("/radicados/:id_radicado", RadicadosController.deleteRadicado);

//Authentication
router.post("/register", Register.register);

export default router;
