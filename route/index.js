const authMW = require('../middleware/auth/authMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const loginMW = require('../middleware/auth/loginMW');
const logoutMW = require('../middleware/auth/logoutMW');
const newPasswordMW = require('../middleware/auth/newPasswordMW');
const signupMW = require('../middleware/auth/signupMW');

const renderMW = require('../middleware/renderMW');

const deleteIngredientMW = require('../middleware/ingredient/deleteIngredientMW');
const getIngredientMW = require('../middleware/ingredient/getIngredientMW');
const getIngredientsMW = require('../middleware/ingredient/getIngredientsMW');
const saveIngredientMW = require('../middleware/ingredient/saveIngredientMW');

const deleteRecipeMW = require('../middleware/recipe/deleteRecipeMW');
const getRecipeMW = require('../middleware/recipe/getRecipeMW');
const getRecipesMW = require('../middleware/recipe/getRecipesMW');
const convertRecipesIngredientsMW = require('../middleware/recipe/convertRecipesIngredientsMW');
const convertRecipeIngredientsMW = require('../middleware/recipe/convertRecipeIngredients');

const saveRecipeMW = require('../middleware/recipe/saveRecipeMW');

const IngredientModel = require('../models/ingredient');
const RecipeModel = require('../models/recipe');
const UserModel = require('../models/user');


module.exports = function (app) {
    const objRepo = {
        IngredientModel: IngredientModel,
        RecipeModel: RecipeModel,
        userModel: UserModel
    };

    app.use('/signup',
        inverseAuthMW(objRepo),
        signupMW(objRepo),
        loginMW(objRepo),
        renderMW(objRepo, 'signup'));
    app.use('/forgotpw',
        inverseAuthMW(objRepo),
        newPasswordMW(objRepo),
        renderMW(objRepo, 'forgotpw'));
    app.get('/logout',
        authMW(objRepo),
        logoutMW(objRepo));

    app.get('/recipes/new',
        authMW(objRepo),
        getIngredientsMW(objRepo),
        renderMW(objRepo, 'modifyRecipe'));
    app.post('/recipes/new',
        authMW(objRepo),
        saveRecipeMW(objRepo));
    app.get('/recipes/mod/:recipe_id',
        authMW(objRepo),
        getRecipeMW(objRepo),
        getIngredientsMW(objRepo),
        convertRecipeIngredientsMW(objRepo),
        renderMW(objRepo, 'modifyRecipe'));
    app.post('/recipes/mod/:recipe_id',
        authMW(objRepo),
        getRecipeMW(objRepo),
        getIngredientsMW(objRepo),
        convertRecipeIngredientsMW(objRepo),
        saveRecipeMW(objRepo));
    app.get('/recipes/del/:recipe_id',
        authMW(objRepo),
        getRecipeMW(objRepo),
        deleteRecipeMW(objRepo));
    app.get('/recipes',
        authMW(objRepo),
        getRecipesMW(objRepo),
        convertRecipesIngredientsMW(objRepo),
        renderMW(objRepo, 'recipes'));

    app.get('/ingredients/new',
        authMW(objRepo),
        renderMW(objRepo, 'modifyIngredient'));
    app.post('/ingredients/new',
        authMW(objRepo),
        saveIngredientMW(objRepo));
    app.get('/ingredients/mod/:ingredient_id',
        authMW(objRepo),
        getIngredientMW(objRepo),
        renderMW(objRepo, 'modifyIngredient'));
    app.post('/ingredients/mod/:ingredient_id',
        authMW(objRepo),
        getIngredientMW(objRepo),
        saveIngredientMW(objRepo));
    app.get('/ingredients/del/:ingredient_id',
        authMW(objRepo),
        getIngredientMW(objRepo),
        deleteIngredientMW(objRepo));
    app.get('/ingredients',
        authMW(objRepo),
        getIngredientsMW(objRepo),
        renderMW(objRepo, 'ingredients'));

    app.use('/',
        inverseAuthMW(objRepo),
        loginMW(objRepo),
        renderMW(objRepo, 'index'));
};