import Documento from "../../models/modelosQX/modeloPrueba.js";

export const pruebaGet = async (req, res) => {
  try {
    const siu = await Documento.findAll();
    res.status(200).json(siu);
  } catch (error) {
    console.log(error);
  }
};
