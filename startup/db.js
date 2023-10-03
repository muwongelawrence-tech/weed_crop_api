const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config")

module.exports = function(){
 // connecting to mongodb..
    const db = config.get("db");
 mongoose.connect(db)
 .then(() => winston.info(`connected to ${ db } ....`))
 .catch(error => console.error("could not connect to Mongodb .....",error.message));
}