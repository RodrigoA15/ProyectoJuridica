import Radicados from "../../../models/radicados.js";

export const AllRadicadosByDate = async (req, res) => {
  try {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    const response = await Radicados.find({
      fecha_radicado: { $gte: startDate, $lte: endDate },
    }).populate([
      { path: "id_procedencia", select: "nombre -_id" },
      { path: "id_canal_entrada", select: "nombre_canal -_id" },
      { path: "id_asunto", select: "nombre_asunto -_id" },
      { path: "id_tipificacion", select: "nombre_tipificacion -_id" },
      { path: "id_entidad", select: "nombre_entidad -_id" },
      { path: "id_departamento", select: "nombre_departamento -_id" },
    ]);

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No se encontraron resultados");
    }
  } catch (error) {
    res.status(500).json(`error Radicados por fecha admin ${error.message}`);
    console.log(error);
  }
};
