import Asignacion from "../../models/asignar_radicado.js";

export const getAllAsignacion = async (req, res) => {
  try {
    const response = await Asignacion.find({});
    if (response.length > 0) {
      response.status(200).json(response);
    } else {
      response.status(404).json("No se encontraron asignaciones");
    }
  } catch (error) {
    resizeBy.status(500).json(error);
  }
};

export const createAsignacion = async (req, res) => {
  const { id_radicado, id_usuario, fecha_asignacion } = req.body;
  try {
    const newAsignacion = new Asignacion({
      id_radicado,
      id_usuario,
      fecha_asignacion,
    });

    const savedAsignacion = await newAsignacion.save();

    if (savedAsignacion) return res.status(200).json("Asignacion creada");
    return res.status(500).json("No se pudo crear la asignacion");
  } catch (error) {
    res.status(500).json(error);
  }
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
