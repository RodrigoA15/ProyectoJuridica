import Tipificacion from "../../models/tipificacion.js";

export const getTipificacion = async (req, res) => {
  try {
    const tipificacion = await Tipificacion.find();

    if (tipificacion.length > 0) {
      res.status(200).json(tipificacion);
    } else {
      res.status(404).json("No se encontraron tipos");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createTipificacion = async (req, res) => {
  try {
    const { nombre_tipificacion } = req.body;
    const newTipificacion = new Tipificacion({ nombre_tipificacion });

    const saveTipificacion = await newTipificacion.save();

    if (saveTipificacion) {
      res.status(200).json("Creada correctamente");
    } else {
      res.status(500).json("NO se pudo crear");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getByIdTipificacion = async (req, res) => {
  try {
    const foundTipificacion = await Tipificacion.findById(
      req.params.id_tipificacion
    );

    if (!foundTipificacion)
      return res.status(404).json("No se encontro el tipo");

    res.status(200).json(foundTipificacion);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateTipificacion = async (req, res) => {
  try {
    const { nombre_tipificacion } = req.body;
    if (!nombre_tipificacion) {
      return res.status(400).json("El campo nombre_tipificacion es requerido");
    }
    const foundTipificacion = await Tipificacion.findById(
      req.params.id_tipificacion
    );

    if (!foundTipificacion)
      return res.status(404).json("No se encontro el tipo");

    await Tipificacion.findByIdAndUpdate(
      req.params.id_tipificacion,
      { nombre_tipificacion },
      { new: true }
    );

    res.status(200).json("Actualizado Correctamente");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const deleteTipificacion = async (req, res) => {
  try {
    const deleteTipificacion = await Tipificacion.findByIdAndDelete(
      req.params.id_tipificacion
    );

    if (!deleteTipificacion)
      return res.status(404).json("No se encontro el tipo");

    return res.status(200).json("Eliminado correctamente");
  } catch (error) {
    res.status(500).json(error);
  }
};
