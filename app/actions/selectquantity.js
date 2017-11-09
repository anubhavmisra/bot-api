let stringify = require('json-stringify');
let mb = require('../lib/milkbasket');
let utils = require('../lib/requestutils');

class SelectQuantityAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            let selectedQuantity =  utils.getparameter(req, 'selectedQuantity');
            let product = utils.getparameter(req, 'product');
            let brand = utils.getparameter(req, 'brand');

            //call MB search with product, brand, quantity
            mb.callSearch(product, brand, selectedQuantity).then((output) => {
                let responseJson = '';
                console.log(output);
                if(typeof output.data !== 'undefined' && output.data !== null){
                  if(output.data.length > 1){
                    //send a regular 'multiple results' response
                    responseJson = utils.getMultipleResultsResponse(output);
                  } else if (output.data.length === 1){
                    //TODO: add this product to the basket
        
                    //"speech" is the spoken version of the response, "displayText" is the visual version
                    //Default response: show added product name
                    let response = `I have added \'${output.data[0].nm}\' to your basket(Not really).`;
                    responseJson = stringify({ "speech": response, "displayText": response});
                  } else if (output.data.length < 1){
                    //Default response: no results
                    let response = `I could not find any results for ${product}.`;
                    responseJson = stringify({ "speech": response, "displayText": response});
                  }
                } else {
                  let response = `I could not find any results for ${product}.`;
                  responseJson = stringify({ "speech": response, "displayText": response});
                }
        
                resolve(responseJson);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }
}
 
module.exports = SelectQuantityAction;
