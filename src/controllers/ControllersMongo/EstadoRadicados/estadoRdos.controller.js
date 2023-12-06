import Estado from "../../models/estado_radicados.js";

export const createEstado = async (req, res) => {
  const { nombre_estado } = req.body;
  try {
    const newEstado = new Estado({ nombre_estado });

    const savedEstado = await newEstado.save();

    if (savedEstado) return res.status(200).json("Creado correctamente");
    return res.status(500).json({ message: "No se pudo crear :(" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
