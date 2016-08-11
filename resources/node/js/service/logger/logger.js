var winston = require('winston');
winston.emitErrs = true;

var logLevel = 'info';

var logger;
module.exports = function(level) {
    if(level != null) {
        logLevel = level;
    }
 
    if(logger) {
        return logger;
    }
    logger = new winston.Logger({
        transports: [
            new winston.transports.Console({
                level: logLevel,
                handleExceptions: true,
                json: false,
                colorize: false
            })
        ],
        exitOnError: false
    });
    
    
    return logger;
};