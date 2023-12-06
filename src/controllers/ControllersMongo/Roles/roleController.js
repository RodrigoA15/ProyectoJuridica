import Role from "../../models/roles.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    if (roles.length === 0)
      return res.status(404).json("No se encontraron roles");
    return res.status(200).json(roles);
  } catch (error) {
    res.status(500).json("Error: " + error.message);
    console.log(error);
  }
};

export const createRole = async (req, res) => {
  try {
    const { nombre_rol } = req.body;
    const newRol = new Role({ nombre_rol });

    const saveRole = await newRol.save();

    if (saveRole) {
      res.json(`Creado correctamente`);
    } else {
      res.json(`Error al crear rol`);
    }
  } catch (error) {
    res.status(500).json(`Error de servidor: ${error}`);
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id_role);

    if (!role) return res.status(404).json("No se encontro el rol");
    return res.status(200).json(role);
  } catch (error) {
    res.status(500).json(`error de servidor ${error}`);
  }
};

export const updateRole = async (req, res) => {
  try {
    const rolefound = await Role.findById(req.params.id_role);
    const { nombre_rol } = req.body;

    if (!rolefound) return res.status(404).json("NO se encontro el rol");

    await Role.findByIdAndUpdate(
      { _id: req.params.id_role },
      {
        nombre_rol,
      },
      {
        new: true,
      }
    );
    return res.json(`Actualizado correctamente`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteRole = async (req, res) => {
  try {
    const foundRole = await Role.findById(req.params.id_role);

    if (!foundRole) return res.status(404).json("No se encontro el rol");
    const deleteRole = await Role.findByIdAndDelete(req.params.id_role);

    if (deleteRole) return res.status(200).json("Eliminado correctamente");
    res.status(500).json("No se pudo eliminar el rol");
  } catch (error) {
    res.status(500).json(`Error de sevidor ${error}`);
  }
};
