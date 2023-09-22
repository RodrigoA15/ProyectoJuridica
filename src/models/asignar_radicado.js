import mongoose from "mongoose";

const Asignacion = new mongoose.Schema({
  id_radicado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Radicados",
    required: true,
  },

  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },

  fecha_asignacion: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Asignaciones", Asignacion);
