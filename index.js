import { ConnectionMongo } from "./src/connection/connection.js";
import app from "./app.js";

const PORT = 4000;
const HOST = '192.168.28.74';


ConnectionMongo();

app.listen(PORT, HOST, (error) => {
  if (error) {
    console.log(`error server: ${error}`);
  } else {
    console.log(`Server listening on ${PORT}, ${HOST}`);
  }
});

