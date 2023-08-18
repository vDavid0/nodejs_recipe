/**
 * convert ingredients of one recipe from mongodb document to javascript array, and complete the ingredients with amount
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return async function(req, res, next) {
        const ingredients = Array.from(res.locals.recipe._ingredients);

        for(let i = 0; i<ingredients.length; ++i) {
            await IngredientModel.findOne(
                {
                    _id: ingredients[i].ingredient_id
                },
                (err, ingredient) => {
                    if (err || !ingredient) {
                        return next(err);
                    }

                    res.locals.convertedRecipe._ingredients.push({
                        id: ingredients[i].ingredient_id,
                        name: ingredient.name,
                        amount: ingredients[i].amount,
                        unit: ingredient.unit
                    });
                }
            );
        }
        return next();
    };
};

