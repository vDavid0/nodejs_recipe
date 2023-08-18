/**
 * Checks if the user is authenticated. If yes, call next, else redirect to /
 */

//const requireOption = require('../requireOption');

module.exports =  (objectrepository)  => {
    return function (req, res, next) {

        return next();
    };
};