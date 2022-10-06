const mongoose = require("mongoose");
const config = require("config")

module.exports = function(){
 // connecting to mongodb either atlas or campus.
    const db = config.get("db");
    mongoose.connect(db).then(() => console.log('connected to mongodb'));
}