import mongoose from "mongoose";

export const RadicadoSchema = new mongoose.Schema(
  {
    numero_radicado: {
      type: String,
      required: true,
      unique: true,
    },

    fecha_radicado: {
      type: Date,
      required: true,
    },

    id_procedencia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Procedencia",
      required: true,
    },

    id_canal_entrada: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canal_entrada",
      required: true,
    },

    id_asunto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asunto",
      required: true,
    },

    id_tipificacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tipificacion",
      required: true,
    },

    id_entidad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entidad",
      required: true,
    },

    id_usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Radicados", RadicadoSchema);
