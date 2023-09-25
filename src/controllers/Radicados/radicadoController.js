import Radicado from "../../models/radicados.js";

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
