import mongoose from "mongoose";

const RadicadoSchema = new mongoose.Schema(
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

    cantidad_respuesta: {
      type: Number,
      required: true,
    },

    observaciones_radicado: {
      type: String,
    },

    //Relaciones>>>>
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

    id_departamento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departamento",
      required: true,
    },

    estado_radicado: {
      type: mongoose.Schema.Types.String,
      ref: "EstadoRadicado",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Radicados", RadicadoSchema);
