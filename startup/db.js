const mongoose = require("mongoose");
const config = require("config")

module.exports = function(){
 // connecting to mongodb
    const db = config.get("db");
//  mongoose.connect(db,{ useNewUrlParser: true },{ useUnifiedTopology: true })
 mongoose.connect("mongodb://127.0.0.1:27017/vidly")
 .then(() => console.log('connected to mongodb'));
}