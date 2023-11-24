import Radicado from "../../models/radicados.js";
import Entidad from "../../models/entidad.js";
import Canal from "../../models/canal_entrada.js";
import Departamento from "../../models/departamentos.js";

export const getRadicados = async (req, res) => {
  try {
    const radicados = await Radicado.find()
      .populate(
        "id_procedencia numero_radicado id_canal_entrada id_asunto id_tipificacion id_entidad id_departamento"
      )
      .lean();
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
    }).lean();

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No hay radicados Pendientes");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Radicados Asignados
export const allRadicadosAsignados = async (req, res) => {
  try {
    const response = await Radicado.find({
      estado_radicado: { $eq: "Asignados" },
    }).lean();

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
    }).lean();

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
      observaciones_radicado: observaciones_radicado || "N/A",
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
    const radicado = await Radicado.findById(req.params.id_radicado)
      .populate(
        "id_procedencia numero_radicado id_canal_entrada id_asunto id_tipificacion id_entidad id_usuario"
      )
      .lean();

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
    })
      .populate("id_departamento id_asunto")
      .lean();

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
    })
      .populate("id_departamento id_asunto id_procedencia")
      .lean();

    if (!response.length > 0)
      return res
        .status(404)
        .json("No se encontraron resultados en la busqueda");
    return res.status(200).json(response);
  } catch (error) {
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

//Grafica entidad
export const chartEntidad = async (req, res) => {
  try {
    const entidad1 = await Entidad.findOne({ nombre_entidad: "Movit" });
    const entidad2 = await Entidad.findOne({ nombre_entidad: "Secretaria" });

    const fechaInicio = req.params.fechainicio;
    const fechaFin = req.params.fechafin;

    const countEntidades = await Radicado.aggregate([
      {
        $match: {
          $or: [{ id_entidad: entidad1._id }, { id_entidad: entidad2._id }],
          fecha_radicado: {
            $gte: new Date(fechaInicio),
            $lte: new Date(fechaFin),
          },
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
    const fechaInicio = req.params.fecha_inicio;
    const fechaFin = req.params.fecha_fin;
    const response = await Radicado.aggregate([
      {
        $match: {
          $and: [
            { estado_radicado: "Respuesta" },
            {
              fecha_radicado: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin),
              },
            },
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
    ]).exec();

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
    const presencial = await Canal.findOne({ nombre_canal: "Presencial" });
    const email = await Canal.findOne({ nombre_canal: "Correo electrónico" });
    const orfeo = await Canal.findOne({ nombre_canal: "Orfeo" });
    const emailCertificado = await Canal.findOne({
      nombre_canal: "Correo certificado",
    });

    const fechaInicio = req.params.fechainicio;
    const fechaFin = req.params.fechafin;

    const countCanal = await Radicado.aggregate([
      {
        $match: {
          $or: [
            { id_canal_entrada: presencial._id },
            { id_canal_entrada: email._id },
            { id_canal_entrada: orfeo._id },
            { id_canal_entrada: emailCertificado._id },
          ],
          fecha_radicado: {
            $gte: new Date(fechaInicio),
            $lte: new Date(fechaFin),
          },
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

//Grafica Radicados por departamento

export const chartDepartamentoRadicados = async (req, res) => {
  try {
    const fechaInicio = req.params.fecha_inicio;
    const fechaFin = req.params.fecha_fin;

    const juridica = await Departamento.findOne({
      nombre_departamento: "Juridica",
    });
    const rmi = await Departamento.findOne({
      nombre_departamento: "Registro municipal de infractores",
    });

    const front = await Departamento.findOne({
      nombre_departamento: "Front office",
    });

    const sistemas = await Departamento.findOne({
      nombre_departamento: "Sistemas",
    });

    const archivo = await Departamento.findOne({
      nombre_departamento: "Archivo",
    });

    const secretaria = await Departamento.findOne({
      nombre_departamento: "Secretaria",
    });

    console.log(juridica);

    const countDepartamentos = await Radicado.aggregate([
      {
        $match: {
          $or: [
            { id_departamento: juridica._id },
            { id_departamento: rmi._id },
            { id_departamento: front._id },
            { id_departamento: sistemas._id },
            { id_departamento: archivo._id },
            { id_departamento: secretaria._id },
          ],
          fecha_radicado: {
            $gte: new Date(fechaInicio),
            $lte: new Date(fechaFin),
          },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$fecha_radicado" },
          },

          JURIDICA: {
            $sum: {
              $cond: [{ $eq: ["$id_departamento", juridica._id] }, 1, 0],
            },
          },

          RMI: {
            $sum: {
              $cond: [{ $eq: ["$id_departamento", rmi._id] }, 1, 0],
            },
          },

          FRONT_OFFICE: {
            $sum: {
              $cond: [{ $eq: ["$id_departamento", front._id] }, 1, 0],
            },
          },
          SISTEMAS: {
            $sum: {
              $cond: [{ $eq: ["$id_departamento", sistemas._id] }, 1, 0],
            },
          },

          ARCHIVO: {
            $sum: {
              $cond: [{ $eq: ["$id_departamento", archivo._id] }, 1, 0],
            },
          },

          SECRETARIA: {
            $sum: {
              $cond: [{ $eq: ["$id_departamento", secretaria._id] }, 1, 0],
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
          JURIDICA: 1,
          RMI: 1,
          FRONT_OFFICE: 1,
          SISTEMAS: 1,
          ARCHIVO: 1,
          SECRETARIA: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(countDepartamentos);
  } catch (error) {
    res.status(500).json(`error grafica Radicados Departamento ${error}`);
    console.log(error);
  }
};

//Consulta tutela e incidentes de desacato
export const chartAsuntosTeI = async (req, res) => {
  try {
    const response = await Radicado.find({
      estado_radicado: { $ne: "Respuesta" },
    }).populate({
      path: "id_asunto",
      match: {
        $or: [{ tipo_asunto: { $eq: "2" } }, { tipo_asunto: { $eq: "3" } }],
      },
    });

    const filterResult = response.filter((i) => {
      return i.id_asunto !== null;
    });

    if (filterResult.length > 0) {
      res.status(200).json(filterResult);
    } else {
      res.status(404).json("No se encontraron resultados");
    }
  } catch (error) {
    res.status(500).json(`Error en chartAsuntosTeI ${error}`);
  }
};

export const dataFake = async (req, res) => {
  try {
    const cantidadRegistros = 10000;

    for (let i = 7001; i <= cantidadRegistros; i++) {
      const nuevoRadicado = new Radicado({
        numero_radicado: String(i),
        fecha_radicado: new Date("2023-10-29T00:00:00.000Z"),
        cantidad_respuesta: 1,
        id_procedencia: "64f73d985407dc4b3ee76b62",
        id_canal_entrada: "651b129303fd9c4566d649ca",
        id_asunto: "652968be7bec4554a3ce92d1",
        id_tipificacion: "64f73e065407dc4b3ee76b70",
        id_entidad: "6516cfce94b2443346afb3d2",
        id_departamento: "652805c6cc9a173e1f96ab52",
        estado_radicado: "Respuesta",
        createdAt: new Date("2023-10-18T13:07:12.017Z"),
        updatedAt: new Date("2023-10-20T15:30:18.055Z"),
      });
      const save = await nuevoRadicado.save();
      console.log(save);
    }
    res.status(200).json("creado");
  } catch (error) {
    res.status(500).json("error seeders");
    console.log(error);
  }
};
