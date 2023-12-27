import { Router } from "express";
import * as Auth from "../../controllers/Auth/login.auth.js";
import * as Register from "../../controllers/Auth/register.auth.js";
import * as PasswordUPD from "../../controllers/Auth/updateInfo.js";

const router = Router();

//Authentication
router.post("/register", Register.register);
router.post("/login", Auth.login);
router.post("/logout", Auth.logout);
router.get("/verify", Auth.verifyToken);
router.put("/updatepass/:id", PasswordUPD.updatePassword);

export default router;
