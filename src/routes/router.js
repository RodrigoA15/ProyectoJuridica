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
//Authentication
import * as Register from "../controllers/Auth/register.auth.js";
import * as Login from "../controllers/Auth/login.auth.js";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";
import { verifyToken } from "../controllers/Auth/login.auth.js";

const router = Router();

//Departamentos>>>>>>>>>>
router.get("/departamento", authRequired, isAdmin, getDepartamento);
router.post("/departamento", authRequired, createDepartamento);
router.get("/departamento/:id_departamento", authRequired, getDepartamentoById);
router.put("/departamento/:id_departamento", authRequired, updateDepartamento);
router.delete(
  "/departamento/:id_departamento",
  authRequired,
  deleteDepartamento
);  

//Roles>>>>>>>>>>>>
router.get("/role", authRequired, RoleController.getRoles);
router.post("/role", RoleController.createRole);
router.get("/role/:id_role", authRequired, RoleController.getRoleById);
router.put("/role/:id_role", authRequired, RoleController.updateRole);
router.delete("/role/:id_role", authRequired, RoleController.deleteRole);

//Entidad>>>>>>>>
router.get("/entidad", authRequired, EntidadController.getEntidad);
router.post("/entidad", authRequired, EntidadController.createEntidad);
router.get(
  "/entidad/:id_entidad",
  authRequired,
  EntidadController.getEntidadById
);
router.put(
  "/entidad/:id_entidad",
  authRequired,
  EntidadController.updateEntidad
);
router.delete(
  "/entidad/:id_entidad",
  authRequired,
  EntidadController.deleteEntidad
);

//Asunto>>>>>>>
router.get("/asunto", authRequired, AsuntoController.getAsunto);
router.post("/asunto", authRequired, AsuntoController.createAsunto);
router.get("/asunto/:id_asunto", authRequired, AsuntoController.getAsuntoById);
router.put("/asunto/:id_asunto", authRequired, AsuntoController.updateAsunto);
router.delete(
  "/asunto/:id_asunto",
  authRequired,
  AsuntoController.deleteAsunto
);

//Canal Entrada>>>>>>>
router.get("/canal", authRequired, CanalController.getCanal);
router.post("/canal", authRequired, CanalController.createCanal);
router.get("/canal/:id_canal", authRequired, CanalController.getCanalById);
router.put("/canal/:id_canal", authRequired, CanalController.updateCanal);
router.delete("/canal/:id_canal", authRequired, CanalController.deleteCanal);

//Procedencia
router.get("/procedencia", authRequired, ProcendenciaController.getProcedencia);
router.post(
  "/procedencia",
  authRequired,
  ProcendenciaController.createProcedencia
);
router.get(
  "/procedencia/:id_procedencia",
  authRequired,
  ProcendenciaController.getProcedenciaById
);

router.put(
  "/procedencia/:id_procedencia",
  authRequired,
  ProcendenciaController.updateProcedencia
);
router.delete(
  "/procedencia/:id_procedencia",
  authRequired,
  ProcendenciaController.deleteProcedencia
);

//Tipificacion>>>>>>>

router.get(
  "/tipificacion",
  authRequired,
  TipificacionController.getTipificacion
);
router.post(
  "/tipificacion",
  authRequired,
  TipificacionController.createTipificacion
);
router.get(
  "/tipificacion/:id_tipificacion",
  authRequired,
  TipificacionController.getByIdTipificacion
);
router.put(
  "/tipificacion/:id_tipificacion",
  authRequired,
  TipificacionController.updateTipificacion
);
router.delete(
  "/tipificacion/:id_tipificacion",
  authRequired,
  TipificacionController.deleteTipificacion
);

//Radicados>>>>>>>
router.get("/radicados", authRequired, RadicadosController.getRadicados);
router.post("/radicados", authRequired, RadicadosController.createRadicados);
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

//Authentication
router.post("/register", Register.register);
router.post("/login", Login.login);
router.post("/logout", Login.logout);
router.get("/verify", Login.verifyToken);

export default router;
