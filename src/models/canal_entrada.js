import mongoose from "mongoose";

const CanalentradaSchema = new mongoose.Schema(
  {
    nombre_canal: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Canal_entrada", CanalentradaSchema);
