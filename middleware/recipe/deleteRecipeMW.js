/**
 * - Delete the recipe from db
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.recipe === 'undefined') {
            return next();
        }

        res.locals.recipe.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/recipes');
        });
    };
};



