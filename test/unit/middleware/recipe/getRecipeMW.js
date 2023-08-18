const { expect } = require('chai');
const getRecipeMW = require('../../../../middleware/recipe/getRecipeMW');

describe('getRecipeMW middleware', function () {
    it('should set res.locals.recipe and res.locals.convertedRecipe', async function () {
        // Create a mock RecipeModel with the expected behavior
        const RecipeModelMock = {
            findOne: (query, callback) => {
                if (query._id === '2') {
                    const recipe = {
                        _id: '2',
                        name: 'Mock Recipe',
                        description: 'Mock Recipe Description',
                    };
                    callback(null, recipe);
                } else {
                    callback(new Error('Recipe not found'));
                }
            },
        };

        const mw = getRecipeMW({
            RecipeModel: RecipeModelMock,
        });

        const reqMock = {
            params: {
                recipe_id: '2',
            },
        };
        const resMock = {
            locals: {},
        };

        await mw(reqMock, resMock, (err) => {
            expect(err).to.be.undefined;

            expect(resMock.locals.recipe).to.deep.equal({
                _id: '2',
                name: 'Mock Recipe',
                description: 'Mock Recipe Description',
            });

            expect(resMock.locals.convertedRecipe).to.deep.equal({
                id: '2',
                name: 'Mock Recipe',
                description: 'Mock Recipe Description',
                _ingredients: [],
            });
        });
    });
});