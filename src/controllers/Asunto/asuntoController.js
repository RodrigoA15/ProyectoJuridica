import Asunto from "../../models/asunto.js";

export const getAsunto = async (req, res) => {
  const asunto = await Asunto.find();

  if (asunto.length > 0) {
    res.status(200).json(asunto);
  } else {
    res.status(404).json("No hay asuntos");
  }
};

export const createAsunto = async (req, res) => {
  try {
    const { nombre_asunto } = req.body;
    const newAsunto = new Asunto({ nombre_asunto });

    const saveAsunto = await newAsunto.save();
    if (saveAsunto) {
      res.status(200).json("Creado Correctamente");
    } else {
      res.status(200).json("Creado Correctamente");
    }
  } catch (error) {
    res.status(500).json(`error de servidor ${error}`);
  }
};

export const getAsuntoById = async (req, res) => {
  try {
    const asunto = await Asunto.findById(req.params.id_asunto);

    if (!asunto) return res.status(404).json("No se encontro el asunto");
    return res.status(200).json(asunto);
  } catch (error) {
    res.status(500).json(`error de servidor ${error}`);
  }
};

export const updateAsunto = async (req, res) => {
  try {
    const asuntofound = await Asunto.findById(req.params.id_asunto);
    const { nombre_asunto } = req.body;

    if (!asuntofound) return res.status(404).json("NO se encontro el asunto");

    await Asunto.findByIdAndUpdate(
      { _id: req.params.id_asunto },
      {
        nombre_asunto,
      },
      {
        new: true,
      }
    );
    return res.json(`Actualizado correctamente`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteAsunto = async (req, res) => {
  try {
    const foundAsunto = await Asunto.findById(req.params.id_asunto);

    if (!foundAsunto) return res.status(404).json("No se encontro el asunto");
    const deleteAsunto = await Asunto.findByIdAndDelete(req.params.id_asunto);

    if (deleteAsunto) return res.status(200).json("Eliminado Correctamente");
  } catch (error) {
    res.status(500).json(`error de servidor ${error}`);
  }
};
