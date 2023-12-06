import { ConnectionMongo } from "./src/connection/connection.js";
import app from "./app.js";
import { ConnectionBDQX } from "./src/connection/connectionBDQX.js";

const PORT = 4000;
// const HOST = "192.168.28.74";

ConnectionMongo();
ConnectionBDQX();

app.listen(PORT, (error) => {
  if (error) {
    console.log(`error server: ${error}`);
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});
