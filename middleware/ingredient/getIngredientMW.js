/**
 * - Gets the ingredient based on the ingredientid (from the url) and the userid (from session) from the DB,
 *  and save it to res.locals.ingredient, finally calls next.
 *
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return function(req, res, next) {
        IngredientModel.findOne({
            _id: req.params.ingredient_id },
            (err, ingredient) => {
            if (err || !ingredient) {
                return next(err);
            }

            res.locals.ingredient = ingredient;
            return next();
        });
    };
};