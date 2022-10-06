const express = require('express');
const app = express();
const winston = require("winston");
require("./startup/validation")();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/prod")(app);


// environment variables and this helps to set the port dynamically
const port = process.env.PORT || 3400;

// process.on('uncaughtException', (ex) => {
//     console.error('EX: ', ex.message)
// }); ///

const server = app.listen(port, () => {
     winston.info(`listening on port ${ port }..........`);
   
});

module.exports = server;
