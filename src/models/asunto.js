import mongoose from "mongoose";
const AsuntoSchema = new mongoose.Schema(
  {
    nombre_asunto: {
      type: String,
      required: true,
    },

    id_departamento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departamento",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Asunto", AsuntoSchema);
