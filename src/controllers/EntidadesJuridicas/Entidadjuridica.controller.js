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
    const { runtentidad } = req.params;
    const response = await EntidadJuridica.findOne({
      runt_ente: { $eq: runtentidad },
    });
    if (response) {
      res.status(200).json({ message: "Entidad ya registrada" });
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
    const { desc_ente_juridico, municipio, runt_ente } = req.body;
    // //input validation
    if (!desc_ente_juridico || !municipio || !runt_ente) {
      return res
        .status(400)
        .json("Description, municipality  and runt ente are required fields.");
    }

    // Check if runt ente already
    const existingEntity = await EntidadJuridica.findOne({ runt_ente });
    if (existingEntity) {
      return res.status(400).json(`Runt ente alredy exists ${runt_ente}`);
    }

    //create entity
    const newEntity = new EntidadJuridica({
      desc_ente_juridico,
      municipio,
      runt_ente,
    });

    //save entity
    const savedEntity = await newEntity.save();

    console.log(`Entity created: ${savedEntity}`);
  } catch (error) {
    console.log(`error entity controller ${error}`);
  }
};
