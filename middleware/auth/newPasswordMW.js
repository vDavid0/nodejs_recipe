/**
 * - Checks if username is received.
 *     - If true, overrides the users password and console.log the new password
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};