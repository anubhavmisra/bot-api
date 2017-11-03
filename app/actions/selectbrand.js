let stringify = require('json-stringify');
let mb = require('../lib/milkbasket');
let utils = require('../lib/requestutils');

class SelectBrandAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            let selectedBrand =  utils.getparameter(req, 'selectedBrand');
            let product = utils.getparameter(req, 'product');
 
            //TODO: call MB search with product, brand
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
 
module.exports = SelectBrandAction;
