"use strict";

var _connection = require("./src/connection/connection.js");
var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PORT = 4000;
const HOST = "192.168.28.74";
(0, _connection.ConnectionMongo)();
_app.default.listen(PORT, HOST, error => {
  if (error) {
    console.log(`error server: ${error}`);
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});