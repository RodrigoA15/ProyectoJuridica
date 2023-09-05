import mongoose from "mongoose";

const EntidadSchema = new mongoose.Schema(
  {
    nombre_entidad: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Entidad", EntidadSchema);
