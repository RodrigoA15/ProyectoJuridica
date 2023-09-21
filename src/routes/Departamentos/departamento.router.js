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
  isAdmin,
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

router.get("/legal_user", authRequired, DepartamentoController.UserDepartament);

export default router;
