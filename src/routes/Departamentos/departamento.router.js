import { Router } from "express";
import * as DepartamentoController from "../../controllers/Departamento/departamentoController.js";
import { isAdmin, authRequired } from "../../middlewares/validateToken.js";

const router = Router();

//Departamentos>>>>>>>>>>
router.get(
  "/departamento",
  authRequired,
  DepartamentoController.getDepartamento
);
router.post(
  "/departamento",
  authRequired,
  DepartamentoController.createDepartamento
);
router.get(
  "/departamento/:id_departamento",
  authRequired,
  DepartamentoController.getDepartamentoById
);
router.put(
  "/departamento/:id_departamento",
  authRequired,
  DepartamentoController.updateDepartamento
);
router.delete(
  "/departamento/:id_departamento",
  authRequired,
  DepartamentoController.deleteDepartamento
);

//Consultas usuarios por departamento

router.get(
  "/usuarios_departamento/:id_departamento",
  authRequired,
  DepartamentoController.UserDepartament
);

router.get(
  "/dptoentidad/:id_entidad",
  DepartamentoController.getEntidadByDepartamento
);
export default router;
