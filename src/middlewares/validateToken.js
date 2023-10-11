import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import User from "../models/users.js";
import Roles from "../models/roles.js";

export const authRequired = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(404).json("Acceso denegado");

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json("Invalid Token");
      req.user = user;

      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const roles = await Roles.find({ _id: { $in: user.role } });
    console.log(roles);

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].nombre_rol === "admin") {
        next();
        return;
      }
    }
    return res.status(403).json("Not permission");
  } catch (error) {
    console.log(error);
  }
};

export const isJuridica = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const rol = await Roles.find({ _id: { $in: user.role } });

    for (let i = 0; i < rol.length; i++) {
      if (rol[i].nombre_rol === "Juridica") {
        next();
        return;
      }
    }
    return res.status(403).json("No tienes permiso");
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
};
