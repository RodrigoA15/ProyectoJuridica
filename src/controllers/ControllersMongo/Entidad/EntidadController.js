import Entidad from "../../models/entidad.js";

export const getEntidad = async (req, res) => {
  try {
    const entidad = await Entidad.find();

    if (entidad.length === 0)
      return res.status(404).json("No se encontraron entidades");
    res.status(200).json(entidad);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const createEntidad = async (req, res) => {
  try {
    const { nombre_entidad } = req.body;

    const newEntidad = new Entidad({ nombre_entidad });
    const saveEntidad = await newEntidad.save();

    if (!saveEntidad)
      return res.status(500).json("NO se pudo crear la entidad");
    res.status(200).json("Entidad creada");
  } catch (error) {
    res.json(`Error de servidor ${error}`);
  }
};

export const getEntidadById = async (req, res) => {
  try {
    const entidad = await Entidad.findById(req.params.id_entidad);

    if (!entidad) return res.status(404).json("No se encontro la entidad");
    res.status(200).json(entidad);
  } catch (error) {
    res.status(500).json(`Error de servidor ${error}`);
  }
};

export const updateEntidad = async (req, res) => {
  try {
    const foundEntidad = await Entidad.findById(req.params.id_entidad);
    const { nombre_entidad } = req.body;

    if (!foundEntidad) return res.status(404).json("No se encontro la entidad");

    await Entidad.findByIdAndUpdate(
      { _id: req.params.id_entidad },
      { nombre_entidad },
      { new: true }
    );

    res.status(200).json("Actualizado correctamente");
  } catch (error) {
    res.status(500).json(`error de servidor ${error}`);
  }
};

export const deleteEntidad = async (req, res) => {
  try {
    const foundEntidad = await Entidad.findById(req.params.id_entidad);

    if (!foundEntidad) return res.status(404).json("No se encontro la entidad");

    const deleteEntidad = await Entidad.findByIdAndDelete(
      req.params.id_entidad
    );

    deleteEntidad
      ? res.status(200).json("Eliminado correctamente")
      : res.status(500).json("No se pudo eliminar la entidad");
  } catch (error) {
    res.status(500).json(`Error de servidor: ${error}`);
  }
};


