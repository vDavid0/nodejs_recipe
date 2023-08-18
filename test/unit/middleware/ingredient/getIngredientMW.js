var expect = require('chai').expect;
var getIngredientMW = require('../../../../middleware/ingredient/getIngredientMW');

describe('getIngredientMW middleware ', function () {
    it('should set rec.locals.ingredient with an ingredient from db', function (done) {
        const mw = getIngredientMW({
            IngredientModel:{
                findOne: (p1,cb)=> {
                    expect(p1).to.be.eql({_id:'1'});
                    cb(null, 'mockingredient');
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw({
            params: {
                ingredient_id: '1'
            }
        },
            resMock,
            () => {
                expect(resMock.locals).to.be.eql({ingredient: 'mockingredient'});
                done();
            }
        );
    });
});