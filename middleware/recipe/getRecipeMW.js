/**
 * - Gets the recipe based on the recipeid (from the url) and the userid (from session) from the DB,
 *  and save it to res.locals.recipe, finally calls next.
 * - If the recipe is not found, redirects to /recipes
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RecipeModel = requireOption(objectrepository, 'RecipeModel');

    return async function(req, res, next) {
        await RecipeModel.findOne(
            {
                _id: req.params.recipe_id
            },
            (err, recipe) => {
                if (err || !recipe) {
                    return next(err);
                }
                res.locals.recipe = recipe;

                res.locals.convertedRecipe = undefined;
                res.locals.convertedRecipe = {
                    id: recipe._id,
                    name: recipe.name,
                    description: recipe.description,
                    _ingredients: []
                }
                return next();
            }
        );
    };
};