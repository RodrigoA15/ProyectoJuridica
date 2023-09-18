import { Router } from "express";
import * as RoleController from "../../controllers/Roles/roleController.js";
import { authRequired } from "../../middlewares/validateToken.js";

const router = Router();

//Roles>>>>>>>>>>>>
router.get("/role", authRequired, RoleController.getRoles);
router.post("/role", RoleController.createRole);
router.get("/role/:id_role", authRequired, RoleController.getRoleById);
router.put("/role/:id_role", authRequired, RoleController.updateRole);
router.delete("/role/:id_role", authRequired, RoleController.deleteRole);

export default router;
