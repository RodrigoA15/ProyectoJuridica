import { Sequelize } from "sequelize";
import database from "../../env.js";

export const ConnectionBDQX = async () => {
  const sequelize = new Sequelize(
    //Crendenciales Base de datos QX
    database.service_name,
    database.user,
    database.password,
    {
      host: database.hostname,
      port: database.port,
      dialect: "oracle",
    }
  );

  try {
    //Prueba si la conexion esta bien
    await sequelize.authenticate();
    console.log(`Connection successful to database: ${database.service_name}`);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
};
