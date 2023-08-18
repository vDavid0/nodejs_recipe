/**
 *    - Loads the ingredients of a logged-in user from the DB. Save result to res.locals.ingredients
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return function(req, res, next) {
        IngredientModel.find({}, (err, ingredients) => {
            if (err) {
                return next(err);
            }

            res.locals.ingredients = ingredients;
            return next();
        });
    };
};