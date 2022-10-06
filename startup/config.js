const config  = require("config");

module.exports = function(){
    // check whether the environment variable is set or not 
    if(!config.get("jwtPrivateKey")){
    throw new Error("FATAL ERROR jwtPrivateKey is not defined.");

  }     
}