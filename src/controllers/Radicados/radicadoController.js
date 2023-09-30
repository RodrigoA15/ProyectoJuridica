import Radicado from "../../models/radicados.js";
import Entidad from "../../models/entidad.js";

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
      id_departamento: "65047a632785185cd986701e",
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

export const juridicaRadicadoRespondido = async (req, res) => {
  try {
    const response = await Radicado.find({
      id_departamento: "65047a632785185cd986701e",
      estado_radicado: "Respuesta",
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

export const queryChartEntidad = async (req, res) => {
  try {
    const entidad1 = await Entidad.findOne({ nombre_entidad: "Movit" });
    const entidad2 = await Entidad.findOne({ nombre_entidad: "Secretaria" });
    const fecha_radicado = "2023-09-26T00:00:00.000Z";

    const countEntidad1 = await Radicado.countDocuments({
      id_entidad: entidad1._id,
      fecha_radicado: fecha_radicado,
    }).exec();

    const countEntidad2 = await Radicado.countDocuments({
      id_entidad: entidad2._id,
      fecha_radicado: "2023-09-29T00:00:00.000Z",
    }).exec();

    console.log("Count for entidad 1:", countEntidad1);
    console.log("Count for entidad 2:", countEntidad2);
    console.log("Count for entidad 2:", fecha_radicado);

    res.status(200).json([
      {
        Movit: countEntidad1,
        Secretaria: countEntidad2,
        fecha: fecha_radicado,
      },
    ]);
  } catch (error) {
    res.status(500).json(`Error grafica entidad: ${error}`);
  }
};

//Grafica Radicados

export const queryChartRadicados = async (req, res) => {
  try {
    const fecha_radicado = "2023-09-28T00:00:00.000+00:00";
    const response = await Radicado.countDocuments({
      estado_radicado: { $eq: "Respuesta" },
      fecha_radicado: fecha_radicado,
    }).exec();

    console.log(response);

    if (response) {
      res.status(200).json([{ respuestas: response, fecha: fecha_radicado }]);
    } else {
      res.status(404).json("No se encontraron resultados");
    }
  } catch (error) {
    res.status().json(`error grafica radicados ${error}`);
  }
};
