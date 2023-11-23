import Asunto from "../../models/asunto.js";

export const getAsunto = async (req, res) => {
  try {
    const asunto = await Asunto.find().populate("id_departamento");

    if (asunto.length > 0) {
      res.status(200).json(asunto);
    } else {
      res.status(404).json("No hay asuntos");
    }
  } catch (error) {
    res.status(500).json(`error de servidor Asuntos ${error}`);
  }
};

export const createAsunto = async (req, res) => {
  try {
    const { nombre_asunto, id_departamento, tipo_asunto } = req.body;
    const newAsunto = new Asunto({
      nombre_asunto,
      id_departamento,
      tipo_asunto: tipo_asunto || "1",
    });

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
    const { nombre_asunto, tipo_asunto } = req.body;

    if (!asuntofound) return res.status(404).json("NO se encontro el asunto");

    await Asunto.findByIdAndUpdate(
      { _id: req.params.id_asunto },
      {
        nombre_asunto,
        tipo_asunto,
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

//Asuntos por departamento

//Juridica>>>>>
export const getAsuntosByDepartamento = async (req, res) => {
  try {
    const response = await Asunto.find({
      id_departamento: { $eq: req.params.id_departamento },
    });
    console.log(response);

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No se encontraron resultados en la busqueda");
    }
  } catch (error) {
    res.status(500).json(`error asuntos Departamento ${error}`);
  }
};
