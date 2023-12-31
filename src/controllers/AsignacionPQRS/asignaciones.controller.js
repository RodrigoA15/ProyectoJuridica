import Asignacion from "../../models/asignar_radicado.js";
import Radicado from "../../models/radicados.js";

export const getAllAsignacion = async (req, res) => {
  try {
    const response = await Asignacion.find({}).populate([
      { path: "id_usuario" },
      { path: "id_radicado" },
    ]);

    if (response.length > 0) return res.status(200).json(response);
    return res.status(404).json("No se encontraron radicados");
  } catch (error) {
    console.log(error);
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

    if (savedAsignacion) {
      res.status(200).json("Asignacion creada");
    } else {
      res.status(500).json("No se pudo crear la asignacion");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const juridicaRadicadoAsignados = async (req, res) => {
  try {
    const asignaciones = await Asignacion.find({})
      .populate([
        {
          path: "id_radicado",
          match: {
            estado_radicado: "Asignados",
            id_departamento: req.params.id_departamento,
          },
        },
        {
          path: "id_usuario",
        },
      ])
      .exec();

    const validacion = asignaciones.filter((asignacion) => {
      return asignacion.id_radicado !== null;
    });

    if (validacion.length > 0) {
      res.status(200).json(validacion);
    } else {
      res.status(404).json("No se encontraron asignaciones pendientes");
    }
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
};

//TODO consulta para buscar una asignaciones mediante numero de radicado de entrada
export const asignacionesById = async (req, res) => {
  try {
    // TODO Modelo Radicados
    const numero_radicado = req.params.numero_radicado;
    const radicados = await Radicado.findOne({
      numero_radicado: numero_radicado,
    }).select("_id");

    // ? END
    const response = await Asignacion.findOne({
      id_radicado: radicados,
    }).populate("id_radicado");

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No se encontraron resultados en la búsqueda");
    }
  } catch (error) {
    res.status(500).json(`error asignacionesById ${error}`);
  }
};
