import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const createToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      //contiene los datos
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
