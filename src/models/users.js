import mongoose, { Types } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, //Elimina espacios en blanco
  },

  password: {
    type: String,
    required: true,
  },

  departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departamento",
    required: true,
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

export default mongoose.model("Usuario", UserSchema);
