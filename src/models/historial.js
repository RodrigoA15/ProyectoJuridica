import mongoose from "mongoose";

const HistorialSchema = new mongoose.Schema({
  observacion: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Historial", HistorialSchema);
