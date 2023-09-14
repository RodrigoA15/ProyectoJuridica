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
      enum: ["CC", "CE", "PEP", "PPT"],
      required: true,
    },

    numero_identificacion: {
      type: Number,
      required: true,
      unique: true,
    },

    contacto: {
      type: String,
      required: true,
      enum: ["direccion", "telefono", "correo"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Procedencia", ProcedenciaSchema);
