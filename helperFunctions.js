const requireOption = require("./middleware/requireOption");

module.exports = function (objectrepository, ingredients) {
    const IngredientModel = requireOption(objectrepository, 'IngredientModel');
    let convertedIngredients = [];

    for(let i = 0; i<ingredients.length; ++i) {
        IngredientModel.findOne(
            {
                _id: ingredients[i].ingredient_id
            },
            (err, ingredient) => {
                if (err || !ingredient) {
                    console.log(err)
                    return [];
                }

                convertedIngredients.push({
                    id: ingredients[i].ingredient_id,
                    name: ingredient.name,
                    amount: ingredients[i].amount,
                    unit: ingredient.unit
                });

                if(i==ingredients.length-1){
                    //console.log(convertedIngredients);

                    return convertedIngredients;
                }

            }
        );
    }
    return convertedIngredients;
};