import mongoose from "mongoose";

const TipificacionSchema = new mongoose.Schema(
  {
    nombre_tipificacion: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tipificacion", TipificacionSchema);
