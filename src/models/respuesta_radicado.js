import mongoose from "mongoose";

const RespuestaRadicado = new mongoose.Schema({
  id_asignacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asignaciones",
    required: true,
  },

  numero_radicado_respuesta: {
    type: Number,
    required: true,
  },

  urlArchivo: {
    type: String,
    required: true,
  },

  fechaRespuesta: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("RadicadoRespuestas", RespuestaRadicado);
