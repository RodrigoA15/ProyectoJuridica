import User from "../../models/users.js";
import bcrypt from "bcrypt";
import { createToken } from "../../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, departamento, role } = req.body;
    const foundEmail = await User.findOne({ email });

    if (foundEmail)
      res.status(400).json({ message: "Este correo ya esta registrado" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      departamento,
      role,
    });

    const savedUser = await newUser.save();
    const token = await createToken({
      id: savedUser._id,
    });

    res.cookie("token", token);
    console.log(token);
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};
