var stringify = require('json-stringify');
var mb = require('../lib/milkbasket');

class SelectQuantityAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            var selectedQuantity =  req.body.result.parameters.selectedQuantity;
            var product = req.body.result.parameters.product;
            var brand;

            //TODO: call MB search with product, brand, quantity

            var response = 'Cannot search with params yet.';
            responseJson = stringify({ "speech": response, "displayText": response,
              "contextOut": [{"name":"orderintent-followup", "lifespan":5, "parameters":{"product": product}}]
            });
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    }
}
 
module.exports = SelectQuantityAction;
