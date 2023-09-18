import { Router } from "express";
import * as Auth from "../../controllers/Auth/login.auth.js";
import * as Register from "../../controllers/Auth/register.auth.js";

const router = Router();

//Authentication
router.post("/register", Register.register);
router.post("/login", Auth.login);
router.post("/logout", Auth.logout);
router.get("/verify", Auth.verifyToken);

export default router;
