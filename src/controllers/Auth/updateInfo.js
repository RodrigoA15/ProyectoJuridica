import bcrypt from "bcrypt";
import User from "../../models/users.js";

export const updatePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    //TODO Validación de contraseña
    if (!password) {
      return res
        .status(400)
        .json({ error: "La contraseña no puede estar vacía" });
    }

    //TODO encriptacion de contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    const data = await User.findByIdAndUpdate(
      id,
      { password: passwordHash },
      { new: true }
    );

    if (data) {
      res.status(200).json({ message: "Contraseña Actualizada" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la contraseña" });
  }
};
