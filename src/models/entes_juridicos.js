import mongoose from "mongoose";

const EntidadesJuridicas = new mongoose.Schema(
  {
    desc_ente_juridico: {
      type: String,
      required: true,
    },

    municipio: {
      type: String,
      required: true,
    },

    runt_ente: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("EntidadesJuridicas", EntidadesJuridicas);
