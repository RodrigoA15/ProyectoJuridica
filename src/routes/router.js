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
import {
  authRequired,
  isAdmin,
  isJuridica,
} from "../middlewares/validateToken.js";

const router = Router();




















export default router;
