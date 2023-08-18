/**
 *    - Checks if the right fields are received based on POST.
 *     - If true, save to Db and redirect to /recipes
 *     - Else, redirect to /recipes/new
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const RecipeModel = requireOption(objectrepository, 'RecipeModel');

    return function(req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.description === 'undefined' ||
            typeof req.body.amount === 'undefined' ||
            typeof req.body.ingredients === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.recipe === 'undefined') {
            res.locals.recipe = new RecipeModel();
        }

        res.locals.recipe.name = req.body.name;
        res.locals.recipe.description = req.body.description;
        res.locals.recipe._ingredients = [];

        for(let i = 0; i<req.body.ingredients.length; i++){
            let item = {
                ingredient_id: req.body.ingredients[i],
                amount: +req.body.amount[i],
            }
            res.locals.recipe._ingredients.push(item)
        }

        res.locals.recipe.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/recipes');
        });
    };
};