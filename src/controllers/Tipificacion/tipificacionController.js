import Tipificacion from "../../models/tipificacion.js";

export const getTipificacion = async (req, res) => {
  const tipificacion = await Tipificacion.find();

  if (tipificacion.length > 0) {
    res.status(200).json(tipificacion);
  } else {
    res.statys
  }
};
