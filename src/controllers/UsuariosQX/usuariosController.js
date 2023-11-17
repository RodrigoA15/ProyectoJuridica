import Usuarios from "../../models/users.js";

export const allUser = async (req, res) => {
  try {
    const usuarios = await Usuarios.find().populate([
      { path: "departamento", select: "nombre_departamento" },
      { path: "role", select: "nombre_rol" },
    ]);

    if (usuarios.length > 0) {
      res.status(200).json(usuarios);
    } else {
      res.status(404).json("No se encontraron usuarios");
    }
  } catch (error) {
    res.status(500).json(`error al mostrar usuariosQX ${error}`);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, departamento, role } = req.body;
    const idUsuario = req.params.idusuario;
    console.log(idUsuario);

    await Usuarios.findByIdAndUpdate(
      idUsuario,
      {
        username,
        email,
        departamento,
        role,
      },
      { new: true }
    );

    res.status(200).json("Actualizado correctamente");
  } catch (error) {
    res.status(500).json(`Error al actualizar usuario: ${error}`);
    console.log(error);
  }
};
