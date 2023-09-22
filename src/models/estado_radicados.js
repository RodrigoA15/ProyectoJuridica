import mongoose from "mongoose";

const EstadoRadicado = new mongoose.Schema({
  nombre_estado: {
    type: String,
    required: true,
  },
});

export default mongoose.model("EstadoRadicado", EstadoRadicado);
