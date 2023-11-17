import { Router } from "express";
import * as UsuariosController from "../../controllers/UsuariosQX/usuariosController.js";

const router = Router();

router.get("/usuariosQX", UsuariosController.allUser);
router.put("/updusuariosQX/:idusuario", UsuariosController.updateUser);

export default router;
