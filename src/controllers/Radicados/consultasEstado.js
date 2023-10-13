import Radicados from "../../models/radicados.js";

export const getAllPreAsignaciones = async (req, res) => {
  try {
    const response = await Radicados.find({
      id_departamento: { $eq: req.params.id_departamento },
      estado_radicado: { $eq: "Pre-asignacion" },
    }).populate(
      "id_procedencia numero_radicado id_canal_entrada id_asunto id_tipificacion id_entidad id_departamento"
    );

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No se encontraron resultados en la busqueda");
    }
  } catch (error) {
    res.status(500).json(`Error consulta radicados PreAsignados ${error}`);
  }
};
