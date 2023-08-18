/**
 *    - Checks if the right fields are received based on POST.
 *     - If true, save to Db and redirect to /ingredients
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return function(req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.unit === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.ingredient === 'undefined') {
            res.locals.ingredient = new IngredientModel();
        }

        res.locals.ingredient.name = req.body.name;
        res.locals.ingredient.unit = req.body.unit;

        res.locals.ingredient.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/ingredients');
        });
    };
};