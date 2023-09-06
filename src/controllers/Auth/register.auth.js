import User from "../../models/users.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, email, password, departamento, role } = req.body;
    const foundEmail = await User.findOne({ email });

    if (foundEmail) res.status(400).json(["Correo Ya esta registrado"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      departamento,
      role,
    });

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
