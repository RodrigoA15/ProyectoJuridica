import mongoose from "mongoose";

const DepartamentosSchema = new mongoose.Schema(
  {
    nombre_departamento: {
      type: String,
      required: true,
      unique: true,
    },

    id_entidad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entidad",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Departamento", DepartamentosSchema);
