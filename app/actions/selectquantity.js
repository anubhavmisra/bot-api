let stringify = require('json-stringify');
let mb = require('../lib/milkbasket');

class SelectQuantityAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            let selectedQuantity =  req.body.result.parameters.selectedQuantity;
            let product = req.body.result.parameters.product;
            let brand;

            //TODO: call MB search with product, brand, quantity

            let response = 'Cannot search with params yet.';
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
