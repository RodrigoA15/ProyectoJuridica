import Canal from "../../models/canal_entrada.js";

export const getCanal = async (req, res) => {
  try {
    const canal = await Canal.find();

    if (canal.length > 0) {
      res.status(200).json(canal);
    } else {
      res.status(404).json("No hay canales");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createCanal = async (req, res) => {
  try {
    const { nombre_canal } = req.body;
    const newCanal = new Canal({ nombre_canal });

    const savedCanal = await newCanal.save();

    if (savedCanal) {
      res.json("Creado exitosamente");
    } else {
      res.status(500).json("NO se pudo crear el canal");
    }
  } catch (error) {
    res.status(500).json(`Error de servidor: ${error}`);
  }
};

export const getCanalById = async (req, res) => {
  try {
    const canal = await Canal.findById(req.params.id_canal);

    if (!canal) return res.status(404).json("No se encontro el canal");
    return res.status(200).json(canal);
  } catch (error) {
    res.status(500).json(`error de servidor ${error}`);
  }
};

export const updateCanal = async (req, res) => {
  try {
    const { nombre_canal } = req.body;

    const foundCanal = await Canal.findById(req.params.id_canal);

    if (!foundCanal) return res.status(404).json("No se encontro el canal");
    await Canal.findByIdAndUpdate(
      { _id: req.params.id_canal },
      { nombre_canal },
      { new: true }
    );
    res.status(200).json("Actualizado Correctamente");
  } catch (error) {
    res.json(`error de servidor ${error}`);
    console.log(error);
  }
};

export const deleteCanal = async (req, res) => {
  try {
    const foundCanal = await Canal.findById(req.params.id_canal);

    if (!foundCanal) return res.status(404).json("No se encontro el canal");
    const deleteCanal = await Canal.findByIdAndDelete(req.params.id_canal);

    if (deleteCanal) return res.status(200).json("Eliminado correctamente");
    res.status(500).json("No se pudo eliminar el canal");
  } catch (error) {
    res.status(500).json(`Error de sevidor ${error}`);
  }
};

//Grafica

export const canales = async (req, res) => {
  try {
    const response = await Canal.aggregate([
      {
        $match: {
          nombre_canal: { $in: ["PRESENCIAL"] },
        },
      },
      {
        $group: {
          _id: "$nombre_canal",
        },
      },
    ]);

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No hay datos");
    }
  } catch (error) {
    console.log(error);
  }
};
