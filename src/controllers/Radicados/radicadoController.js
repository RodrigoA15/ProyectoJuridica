import Radicado from "../../models/radicados.js";

export const getRadicados = async (req, res) => {
  try {
    const radicados = await Radicado.find().populate(
      "id_procedencia numero_radicado id_canal_entrada id_asunto id_tipificacion id_entidad"
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
      id_usuario,
    } = req.body;

    const newRadicado = new Radicado({
      numero_radicado,
      fecha_radicado,
      id_procedencia,
      id_canal_entrada,
      id_asunto,
      id_tipificacion,
      id_entidad,
      id_usuario,
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
      "id_procedencia numero_radicado id_canal_entrada id_asunto id_tipificacion id_entidad"
    );

    if (!radicado) return res.status(404).json("No se encontro el radicado");
    return res.status(200).json(radicado);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateRadicados = async (req, res) => {
  try {
    const {
      numero_radicado,
      fecha_radicado,
      id_procedencia,
      id_canal_entrada,
      id_asunto,
      id_tipificacion,
      id_entidad,
      id_usuario,
    } = req.body;

    if (!numero_radicado)
      return res.status(400).json("Este campo es obligatorio");

    const updatedRadicado = await Radicado.findByIdAndUpdate(
      req.params.id_radicado,
      {
        numero_radicado,
        fecha_radicado,
        id_procedencia,
        id_canal_entrada,
        id_asunto,
        id_tipificacion,
        id_entidad,
        id_usuario,
      },
      { new: true }
    );

    if (!updatedRadicado)
      return res.status(500).json("No se encontro el radicado");

    return res.status(200).json("Actualizado correctamente");
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
