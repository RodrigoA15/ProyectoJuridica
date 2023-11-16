import Radicados from "../../../models/radicados.js";
import Estados from "../../../models/estado_radicados.js";
import Departamento from "../../../models/departamentos.js";

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

//Estados de radicados por departamento

export const stateByDepartament = async (req, res) => {
  try {
    const estados = await Estados.find();
    const departamentos = await Departamento.find();

    let result = [];

    for (const estado of estados) {
      const counts = await Radicados.aggregate([
        {
          $match: {
            estado_radicado: estado.nombre_estado,
            id_departamento: {
              $in: departamentos.map((dep) => dep._id),
            },
          },
        },
        {
          $lookup: {
            from: "Departamento",
            localField: "id_departamento",
            foreignField: "_id",
            as: "departamento",
          },
        },

        {
          $group: {
            _id: "$id_departamento",
            count: { $sum: 1 },
          },
        },
      ]);

      counts.forEach((count) => {
        const departamentoInfo = departamentos.find((dep) =>
          dep._id.equals(count._id)
        );
        result.push({
          estado: estado.nombre_estado,
          departamento: departamentoInfo
            ? departamentoInfo.nombre_departamento
            : "Desconocido",
          count: count.count,
        });
      });
    }

    console.log();
    res.status(200).json([result]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
