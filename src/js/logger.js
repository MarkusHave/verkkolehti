const moment = require('moment');


// middleware 
const logger = (req, res, next) => {
    // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    // console.log(`Session ID: ${req.sessionID}`);
    next();
};

module.exports = logger;
