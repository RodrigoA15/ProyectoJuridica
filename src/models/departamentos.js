import mongoose from "mongoose";

const DepartamentosSchema = new mongoose.Schema(
  {
    nombre_departamento: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Departamento", DepartamentosSchema);
