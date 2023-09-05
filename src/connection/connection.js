import mongoose from "mongoose";

export const ConnectionMongo = async () => {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1:27017/projectoJuridica")
      .then(() => {
        console.log("Connection to MongoDB established");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
  } catch (error) {
    console.log(error);
  }
};
