require("express-async-errors");
const winston = require("winston");
//require("winston-mongodb");

module.exports = function(){

        // handling un handled exceptions.
        // process.on("uncaughtException" , (ex)=> {
        //     winston.error(ex.message , ex);
        //     process.exit(1);
        // });
        
        winston.handleExceptions(
            new winston.transports.Console({colorize:true ,prettyPrint: true }),
            new winston.transports.File({ filename:"uncaughtExceptions.log"})
        );


        // handling un handled rejections in promises.
        process.on("unhandledRejection", (ex) => {
           throw ex;
        });

        winston.add(winston.transports.File,{ filename:"logfile.log" });
       // winston.add(winston.transports.MongoDB,{ db:"mongodb://localhost/vidly", level: "error"});
}