const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Ingredient = db.model('Ingredient', {
    name: String,
    unit: String,
});

module.exports = Ingredient;