/**
 * - Delete the ingredient from db, redirects to /ingredients
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.ingredient === 'undefined') {
            return next();
        }

        res.locals.ingredient.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/ingredients');
        });
    };
};