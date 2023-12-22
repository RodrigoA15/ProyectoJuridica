import EntidadJuridica from "../../models/entes_juridicos.js";

export const getAllEntities = async (req, res) => {
  try {
    const entities = await EntidadJuridica.find();
    //check if data exists
    if (entities.length > 0) {
      res.status(200).json(entities);
    } else {
      res.status(404).json("Not Found entities");
    }
  } catch (error) {
    res.status(500).json(`error entity controller: ${error}`);
  }
};

export const getEntityById = async (req, res, next) => {
  try {
    const { desc_ente_juridico, municipio } = req.params;
    const response = await EntidadJuridica.findOne({
      desc_ente_juridico: { $eq: desc_ente_juridico },
      municipio: { $eq: municipio },
    });
    if (response) {
      res.status(200).json({ response, message: "Entidad ya registrada" });
    } else {
      res.status(404).json({ message: "No se encontro la entidad" });
    }
  } catch (error) {
    res.status(500).json(`error entityById controller: ${error}`);
  } finally {
    next();
  }
};

export const createEntity = async (req, res) => {
  try {
    const { desc_ente_juridico, municipio } = req.body;

    // Input validation
    if (!desc_ente_juridico || !municipio) {
      return res
        .status(400)
        .json("Description and municipality are required fields.");
    }

    const response = await EntidadJuridica.findOne({
      desc_ente_juridico: desc_ente_juridico,
      municipio: municipio,
    });

    console.log(response);

    if (response) {
      return res.status(200).json("Ente juridico ya registrado");
    }

    const newEntity = new EntidadJuridica({
      desc_ente_juridico,
      municipio,
    });

    // Save entity
    await newEntity.save();
  } catch (error) {
    console.log(`Error in entity controller: ${error}`);
    return res.status(500).json(`error crear entidad juridica ${error}`);
  }
};
