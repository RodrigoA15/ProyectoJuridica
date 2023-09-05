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

    numero_identificacion: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Procedencia", ProcedenciaSchema);
