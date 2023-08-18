/**
 * convert ingredients of all recipes from mongodb document to javascript array, and complete the ingredients with amount
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const IngredientModel = requireOption(objectrepository, 'IngredientModel');

    return async function(req, res, next) {
        for(let i=0; i < res.locals.recipes.length; i++) {
            let ingredients = Array.from(res.locals.recipes[i]._ingredients);

            for(let j = 0; j<ingredients.length; ++j) {
                 await IngredientModel.findOne(
                    {
                        _id: ingredients[j].ingredient_id
                    },
                    (err, ingredient) => {
                        if (err || !ingredient) {
                            return next(err);
                        }

                        res.locals.convertedRecipes[i]._ingredients.push({
                            id: ingredients[j].ingredient_id,
                            name: ingredient.name,
                            amount: ingredients[j].amount,
                            unit: ingredient.unit
                        });
                    }
                );
            }
        }
        return next();
    };
};

