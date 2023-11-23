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

    //Enum tipo asunto
    //1 por defecto. cualquier asunto
    //2 Tutela
    //3 Incidente de desacato

    tipo_asunto: {
      type: String,
      enum: ["1", "2", "3"],
      required: ["Tipo asunto es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Asunto", AsuntoSchema);
