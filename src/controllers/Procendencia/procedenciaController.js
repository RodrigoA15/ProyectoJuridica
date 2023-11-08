import Procedencia from "../../models/procedencia.js";

export const getProcedencia = async (req, res) => {
  try {
    const procedencia = await Procedencia.find();

    if (procedencia.length > 0) {
      res.status(200).json(procedencia);
    } else {
      res.status(404).json("No hay procendedencia");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const createProcedencia = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      numero_identificacion,
      tipo_identificacion,
      tipo_contacto,
      info_contacto,
    } = req.body;
    const newProcedencia = new Procedencia({
      nombre,
      apellido,
      numero_identificacion,
      tipo_identificacion,
      tipo_contacto,
      info_contacto,
    });

    const numero = await Procedencia.findOne({ numero_identificacion });

    if (!numero) {
      const saveProcedencia = await newProcedencia.save();

      if (saveProcedencia) {
        res.status(200).json("Procedencia Creada Correctamente");
        console.log("Procedencia Creada Correctamente");
      } else {
        res.json("NO se pudo crear la procedencia");
        console.log("Ploaca");
      }
    } else {
      res.status(500).json("Usuario ya registrado");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getProcedenciaById = async (req, res, next) => {
  try {
    const procedencia = await Procedencia.findOne({
      numero_identificacion: req.params.numero_identificacion,
    });

    if (procedencia) {
      res.status(200).json([procedencia]);
    } else {
      res.status(404).json("No se encontro la procedencia");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const updateProcedencia = async (req, res) => {
  try {
    const { nombre, apellido, numero_identificacion } = req.body;
    const foundProcedencia = await Procedencia.findById(
      req.params.id_procedencia
    );

    if (!foundProcedencia)
      return res.status(404).json("No se encontro la procedencia");

    await Procedencia.findByIdAndUpdate(
      { _id: req.params.id_procedencia },
      { nombre, apellido, numero_identificacion },
      { new: true }
    );

    res.status(200).json("Actualizado correctamente");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const deleteProcedencia = async (req, res) => {
  try {
    const deleteProcedencia = await Procedencia.findByIdAndDelete(
      req.params.id_procedencia
    );

    if (!deleteProcedencia)
      return res.status(404).json("No se encontro el tipo");
    return res.status(200).json("Eliminado correctamente");
  } catch (error) {
    res.status(500).json(`Error de sevidor ${error}`);
  }
};
