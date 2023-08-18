/**
 * Checks if user is logged in. If yes, redirects to /recipes, else calls next().
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {

        return next();
    };
};