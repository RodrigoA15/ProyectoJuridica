import Historial from "../../models/historial.js";

export const createHistory = async (req, res) => {
  try {
    const { observacion } = req.body;
    const newHistory = new Historial({observacion});
    const saveHistory = await newHistory.save();

    if (saveHistory) {
      res.status(200).json("creado");
    } else {
      res.status(500).json("error al crear historial");
    }
  } catch (error) {
    res.status(500).json(`error en  historial ${error}`);
  }
};
