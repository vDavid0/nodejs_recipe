/**
 *    - Gets the recipes of a logged-in user from the DB.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const RecipeModel = requireOption(objectrepository, 'RecipeModel');

    return function(req, res, next) {
        RecipeModel.find({}, (err, recipes) => {
            if (err) {
                return next(err);
            }

            res.locals.recipes = recipes;
            res.locals.convertedRecipes = [];

            for(let i = 0; i<recipes.length; ++i) {
                res.locals.convertedRecipes.push({
                    id: recipes[i]._id,
                    name: recipes[i].name,
                    description: recipes[i].description,
                    _ingredients: []
                })
            }
            return next();
        });
    };
};