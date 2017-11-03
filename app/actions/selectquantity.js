let stringify = require('json-stringify');
let mb = require('../lib/milkbasket');
let utils = require('../lib/requestutils');

class SelectQuantityAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            let selectedQuantity =  utils.getparameter(req, 'selectedQuantity');
            let product = utils.getparameter(req, 'product');
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
