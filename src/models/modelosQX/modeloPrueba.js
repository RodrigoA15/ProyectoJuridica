import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize();

const TIPO_DOCUMENTO = sequelize.define("TIPO_DOCUMENTO", {
  ABREV_DOCUMENTO: {
    type: DataTypes.STRING,
  },

  ACTIVO: {
    type: DataTypes.STRING,
  },

  DESC_DOCUMENTO: {
    type: DataTypes.STRING,
  },

  DOCUMENTO_AMB: {
    type: DataTypes.STRING,
  },

  DOCUMENTO_RUNT: {
    type: DataTypes.STRING,
  },

  DOCUMENTO_SAP: {
    type: DataTypes.STRING,
  },

  DOCUMENTO_SIMIT: {
    type: DataTypes.STRING,
  },

  FECHA_MODIFICA_BD: {
    type: DataTypes.DATE,
  },

  ID_DOCUMENTO: {
    type: DataTypes.FLOAT,
  },

  ID_DOCUMENTO_DIAN: {
    type: DataTypes.NUMBER,
  },

  ID_DOCUMENTO_SWCENTRAL: {
    type: DataTypes.STRING,
  },

  IDENTIFICACION_CON_CARACTERES: {
    type: DataTypes.STRING,
  },

  MAX_DIGITOS_DOC: {
    type: DataTypes.NUMBER,
  },

  MIN_DIGITOS_DOC: {
    type: DataTypes.NUMBER,
  },

  MIN_DOCUMENTO: {
    type: DataTypes.STRING,
  },

  PREFIJO_DOCUMENTO: {
    type: DataTypes.STRING,
  },

  REGIMEN_TRIBUTARIO: {
    type: DataTypes.STRING,
  },

  TIPO_PERSONA: {
    type: DataTypes.STRING,
  },
});

export default TIPO_DOCUMENTO;
