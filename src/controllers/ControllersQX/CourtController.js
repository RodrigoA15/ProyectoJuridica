import { QueryTypes } from "sequelize";
import { sequelize } from "../../connection/connectionBDQX.js";

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
      "SELECT RUNT_ENTE, DESC_ENTE_JURIDICO, VIGENTE FROM ENTES_JURIDICOS WHERE DESC_ENTE_JURIDICO= :DESC_ENTE_JURIDICO",
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
