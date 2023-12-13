import { QueryTypes } from "sequelize";
import { sequelize } from "../../connection/connectionBDQX.js";
import Radicados from "../../models/radicados.js";

//Returns all current courts
export const allCourts = async (req, res) => {
  try {
    const courts = await sequelize.query(
      "SELECT RUNT_ENTE, DESC_ENTE_JURIDICO, VIGENTE FROM ENTES_JURIDICOS WHERE VIGENTE = 'S'",
      {
        type: QueryTypes.SELECT,
      }
    );

    if (courts.length > 0) {
      res.status(200).json({ message: "List of courts", res: courts });
    } else {
      res.status(404).json({ message: "Court Not found" });
    }
  } catch (error) {
    res.status(500).json(`error all Courts controller ${error}`);
  }
};

//Returns a valid court
export const courtById = async (req, res) => {
  try {
    const { DESC_ENTE_JURIDICO } = req.params;
    const oneCourt = await sequelize.query(
      "SELECT RUNT_ENTE, CONCAT(ENTES_JURIDICOS.DESC_ENTE_JURIDICO, RUNT_TIPO_ENTIDAD_JURIDICA.MUNICIPIO) AS Entidad FROM ENTES_JURIDICOS INNER JOIN RUNT_TIPO_ENTIDAD_JURIDICA ON ENTES_JURIDICOS.ID_ENTE_JURIDICO = RUNT_TIPO_ENTIDAD_JURIDICA.ID_ENTIDAD WHERE DESC_ENTE_JURIDICO=  :DESC_ENTE_JURIDICO",
      {
        replacements: { DESC_ENTE_JURIDICO },
        type: QueryTypes.SELECT,
      }
    );

    if (oneCourt.length > 0) {
      res.status(200).json(oneCourt);
    } else {
      res.status(404).json({ message: "Court Not found" });
    }
  } catch (error) {
    res.status(500).json(`error oneCourt controller ${error}`);
  }
};

//Return number of request courts
export const countRequestCourts = async (req, res) => {
  try {
    const count = await Radicados.aggregate([
      {
        $match: { "juzgado.nombreJuzgado": { $ne: "N/A" } },
      },

      {
        $group: {
          _id: "null",
          total: { $sum: 1 },
        },
      },
    ]);

    if (count.length > 0) {
      res.status(200).json(count);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json(`Internal Server Error countRequestCourts ${error}`);
    console.log(error);
  }
};
