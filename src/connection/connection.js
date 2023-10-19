import mongoose from "mongoose";


export const ConnectionMongo = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://rodrigo:HHGBwM777FMDnZF4@cluster0.rgikcgt.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
        }
      )
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
