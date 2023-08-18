var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Recipe = db.model('Recipe', {
    name: String,
    description: String,

    _ingredients: [new Schema({
        ingredient_id: String,
        amount: Number
    }, {_id: false})]
});

module.exports = Recipe;