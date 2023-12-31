import mongoose from "mongoose";

const ProcedenciaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    apellido: {
      type: String,
      required: true,
    },

    tipo_identificacion: {
      type: String,
      enum: ["CC", "CE", "PEP", "PPT", "OTRO"],
      required: true,
    },

    numero_identificacion: {
      type: Number,
      required: true,
      unique: true,
    },

    tipo_contacto: {
      type: String,
      required: true,
      enum: ["direccion", "telefono", "correo"],
    },

    correo: {
      type: String,
    },

    telefono:{
      type: Number
    },

    direccion: {
      type: String
    }


  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Procedencia", ProcedenciaSchema);
