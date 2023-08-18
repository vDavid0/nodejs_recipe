/*const recipeModel = require('./models/recipe');
const ingredientModel = require('./models/ingredient');


let oneIngredient = new ingredientModel();
oneIngredient.name = "paprika"
oneIngredient.unit = "Kilo"
oneIngredient.save()

let nt = new ingredientModel();
nt.name = "paradicsom"
nt.unit = "Kilo"
nt.save()

let oneRecipe = new recipeModel();
oneRecipe.name = "paprikas krumpli"
oneRecipe.description = "Kil sdf sd f df sd f sdf sa  das dasd asd sd asdasdasd asd asd asd sa daso"
oneRecipe._ingredients = [oneIngredient, nt]
oneRecipe.save()*/



var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('static'));

require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('Problem');
    console.log(err);
});

var server = app.listen(3000, function () {
    console.log("On: 3000")
});
