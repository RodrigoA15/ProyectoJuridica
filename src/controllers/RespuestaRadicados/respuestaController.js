import Respuesta from "../../models/respuesta_radicado.js";

export const getAllRespuestas = async (req, res) => {
  try {
    const response = await Respuesta.find({}).populate({
      path: "id_asignacion",
      populate: {
        path: "id_radicado",
      },
    });

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No se encontraron resultados en la busqueda");
    }
  } catch (error) {
    res.status(500).json(`Error getAll Respuestas ${error.message}`);
  }
};

export const createRespuesta = async (req, res) => {
  try {
    const { id_asignacion, numero_radicado_respuesta } = req.body;

    const newRespuesta = new Respuesta({
      id_asignacion,
      numero_radicado_respuesta,
    });

    const savedRespuesta = await newRespuesta.save();

    if (savedRespuesta) {
      res.status(200).json("Respuesta Creada");
    } else {
      res.status(500).json("Hubo un error al crear la respuesta");
    }
  } catch (error) {
    res.status(500).json(`Error createRespuesta ${error}`);
  }
};
