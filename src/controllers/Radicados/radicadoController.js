import Radicado from "../../models/radicados.js";
import Entidad from "../../models/entidad.js";
import Canal from "../../models/canal_entrada.js";

export const getRadicados = async (req, res) => {
  try {
    const radicados = await Radicado.find().populate(
      "id_procedencia numero_radicado id_canal_entrada id_asunto id_tipificacion id_entidad id_departamento"
    );
    if (radicados.length > 0) {
      res.status(200).json(radicados);
    } else {
      res.status(404).json("No se encontraron radicados");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const allRadicadosPendientes = async (req, res) => {
  try {
    const response = await Radicado.find({
      estado_radicado: { $eq: "Pendiente" },
    });
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No hay radicados Pendientes");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allRadicadosAsignados = async (req, res) => {
  try {
    const response = await Radicado.find({
      estado_radicado: { $eq: "Asignados" },
    });

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No se encontraron radicados Asignados");
    }
  } catch (error) {
    res.status(500).json(`error all adicados Asignados`, error);
  }
};

export const allRadicadosRespondidos = async (req, res) => {
  try {
    const response = await Radicado.find({
      estado_radicado: { $eq: "Respuesta" },
    });

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No se encontraton radicados respondidos");
    }
  } catch (error) {
    res.json("error en all Radicados Respuestos", error);
  }
};

export const createRadicados = async (req, res) => {
  try {
    const {
      numero_radicado,
      fecha_radicado,
      cantidad_respuesta,
      observaciones_radicado,
      id_procedencia,
      id_canal_entrada,
      id_asunto,
      id_tipificacion,
      id_entidad,
      id_departamento,
      estado_radicado,
    } = req.body;

    const newRadicado = new Radicado({
      numero_radicado,
      fecha_radicado,
      cantidad_respuesta,
      observaciones_radicado,
      id_procedencia,
      id_canal_entrada,
      id_asunto,
      id_tipificacion,
      id_entidad,
      id_departamento,
      estado_radicado,
    });

    const saveRadicado = await newRadicado.save();

    if (saveRadicado) return res.status(200).json("creado correctamente");
    return res.status(200).json("No se pudo crear");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const getByIdRadicados = async (req, res) => {
  try {
    const radicado = await Radicado.findById(req.params.id_radicado).populate(
      "id_procedencia numero_radicado id_canal_entrada id_asunto id_tipificacion id_entidad id_usuario"
    );

    if (!radicado) return res.status(404).json("No se encontro el radicado");
    return res.status(200).json(radicado);
  } catch (error) {
    res.status(500).json(error);
  }
};
//Actualizar estado
export const updateRadicados = async (req, res) => {
  try {
    const { estado_radicado } = req.body;

    if (!estado_radicado) return res.status(400).json("Campos requeridos");

    const response = await Radicado.findByIdAndUpdate(
      req.params.id_radicado,
      {
        estado_radicado,
      },
      { new: true }
    );

    if (response) {
      res.status(200).json("Asignado correctamente");
    } else {
      res.status(400).json("No se pudo asignar");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteRadicado = async (req, res) => {
  try {
    const deletedRadicado = await Radicado.findByIdAndDelete(
      req.params.id_radicado
    );

    if (!deletedRadicado)
      return res.status(404).json("No se encontro el radicado");

    return res.json("Eliminado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Consulta estado radicado por departamentos
//Sistemas >>>>>>>

export const departamentoRadicado = async (req, res) => {
  try {
    const response = await Radicado.find({
      id_departamento: "64f75b9e404987956278a7a1",
      estado_radicado: "Pendiente",
    }).populate("id_departamento id_asunto");

    if (!response.length > 0)
      return res
        .status(404)
        .json("No se encontraron resultados en la busqueda");
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

//Juridica >>>>>>
export const juridicaRadicado = async (req, res) => {
  try {
    const response = await Radicado.find({
      id_departamento: { $eq: req.params.id_departamento },
      estado_radicado: "Pendiente",
    }).populate("id_departamento id_asunto");

    if (!response.length > 0)
      return res
        .status(404)
        .json("No se encontraron resultados en la busqueda");
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

//Grafica entidad
export const chartEntidad = async (req, res) => {
  try {
    const entidad1 = await Entidad.findOne({ nombre_entidad: "Movit" });
    const entidad2 = await Entidad.findOne({ nombre_entidad: "Secretaria" });

    const fecha = await Radicado.find().select("fecha_radicado");

    const countEntidades = await Radicado.aggregate([
      {
        $match: {
          $or: [{ id_entidad: entidad1._id }, { id_entidad: entidad2._id }],
          fecha_radicado: { $gte: new Date(fecha), $lte: new Date() },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$fecha_radicado" },
          },

          Movit: {
            $sum: {
              $cond: [{ $eq: ["$id_entidad", entidad1._id] }, 1, 0],
            },
          },

          Secretaria: {
            $sum: {
              $cond: [{ $eq: ["$id_entidad", entidad2._id] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          fecha_radicado: "$_id",
          Secretaria: 1,
          Movit: 1,
          _id: 0,
        },
      },
    ]).exec();
    res.status(200).json(countEntidades);
  } catch (error) {
    console.log(error);
  }
};

//Grafica Radicados

export const queryChartRadicados = async (req, res) => {
  try {
    const fecha = await Radicado.find().select("fecha_radicado");

    const response = await Radicado.aggregate([
      {
        $match: {
          $and: [
            { estado_radicado: "Respuesta" },
            { fecha_radicado: { $gte: new Date(fecha), $lte: new Date() } },
          ],
        },
      },

      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$fecha_radicado" },
          },
          NUM_RADICADOS: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          fecha_radicado: "$_id",
          NUM_RADICADOS: 1,
          _id: 0,
        },
      },
    ]);

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No se encontraron resultados");
    }
  } catch (error) {
    res
      .status(500)
      .json(`Error en la consulta de gráfica de radicados: ${error}`);
  }
};

export const queryChartCanalEntrada = async (req, res) => {
  try {
    const fecha = await Radicado.find().select("fecha_radicado");

    const presencial = await Canal.findOne({ nombre_canal: "PRESENCIAL" });
    const email = await Canal.findOne({ nombre_canal: "CORREO ELECTRONICO" });
    const orfeo = await Canal.findOne({ nombre_canal: "ORFEO" });
    const emailCertificado = await Canal.findOne({
      nombre_canal: "CORREO CERTIFICADO",
    });

    const countCanal = await Radicado.aggregate([
      {
        $match: {
          $or: [
            { id_canal_entrada: presencial._id },
            { id_canal_entrada: email._id },
            { id_canal_entrada: orfeo._id },
            { id_canal_entrada: emailCertificado._id },
          ],
          fecha_radicado: { $gte: new Date(fecha), $lte: new Date() },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$fecha_radicado" },
          },
          Presencial: {
            $sum: {
              $cond: [{ $eq: ["$id_canal_entrada", presencial._id] }, 1, 0],
            },
          },

          Correo: {
            $sum: {
              $cond: [{ $eq: ["$id_canal_entrada", email._id] }, 1, 0],
            },
          },

          Orfeo: {
            $sum: {
              $cond: [{ $eq: ["$id_canal_entrada", orfeo._id] }, 1, 0],
            },
          },

          CorreoCertificado: {
            $sum: {
              $cond: [
                { $eq: ["$id_canal_entrada", emailCertificado._id] },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $sort: { _id: 1 },
      },

      {
        $project: {
          fecha_radicado: "$_id",
          Presencial: 1,
          Correo: 1,
          Orfeo: 1,
          CorreoCertificado: 1,
          _id: 0,
        },
      },
    ]).exec();

    res.status(200).json(countCanal);
  } catch (error) {
    res.status(500).json(`error grafica Canal Entrada ${error}`);
    console.log(error);
  }
};

//Actualizacion de departamentos  (reasignacion de radicado)>>>

export const updateDepartamento = async (req, res) => {
  try {
    const { id_departamento } = req.body;
    const response = await Radicado.findByIdAndUpdate(
      req.params.id_radicado,
      {
        id_departamento,
      },
      { new: true }
    );

    if (response) {
      res.status(200).json("Reasignado Correctamente");
    } else {
      res.status(400).json("No se pudo Reasignar");
    }
  } catch (error) {
    res.status(500).json(`error actualizacion departamento ${error}`);
    console.log(error);
  }
};

export const fechaGrafica = async (req, res) => {
  try {
    const response = await Radicado.find().select("fecha_radicado");

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("NO se encontraron resultados en la busqueda");
    }
  } catch (error) {
    res.status(500).json(`error fecha Grafica ${error}`);
  }
};

