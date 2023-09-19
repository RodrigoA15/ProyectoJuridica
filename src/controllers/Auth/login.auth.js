import User from "../../models/users.js";
import bcrypt from "bcrypt";
import { createToken } from "../../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("role");
    if (!user)
      return res
        .status(404)
        .json({ message: "Este correo no esta registrado" });
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
      return res.status(400).send({ message: "Contraseña incorrecta" });

    const token = await createToken({
      id: user._id,
    });

    res.cookie("token", token);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const logout = async (req, res) => {
  res.cookie("token", " ", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
    });
  });
};
