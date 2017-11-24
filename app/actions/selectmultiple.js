let stringify = require('json-stringify');
let mb = require('../lib/milkbasket');
let utils = require('../lib/requestutils');

//Action to perform a search if there are multiple results for the original parameters
class SelectMultipleAction{
  op(req, res){
    
    return new Promise((resolve, reject) => {
      let product = utils.getparameter(req, "product");
      let brand = utils.getparameter(req, "brand");
      let weight =  utils.getparameter(req, "weight");
      let selectedproduct = utils.getparameter(req, "selectedProduct");
      
      let query = product + " " + selectedproduct;

      // Call the search api
      mb.callSearch(query, brand, weight).then((output) => {
        let responseJson = '';

        if(typeof output.data !== 'undefined' && output.data !== null){
          if(output.data.length > 1){
            //Are there multiple weigths?
            let weights = mb.getweights(output); 
            if (weights.length > 1){
                responseJson = utils.getWeightsResponse(weights);
            } else {
                //send a regular 'multiple results' response
                responseJson = utils.getMultipleResultsResponse(output);
            }
          } else if (output.data.length === 1){
              //add this product to the basket
              let quantity = utils.getparameter(req, 'quantity');
              let extid = utils.getexternalid(req);
              mb.order(extid, output.data[0].id, quantity).then((orderresponse) => {
                //Default response: show added product name
                let response = `I have added ${quantity} \'${output.data[0].nm}\' to your basket.`;
                responseJson = stringify({ "speech": response, "displayText": response});
                resolve(responseJson);
              }).catch((error) => {
                console.log(error);
                reject(error);
              });   
          } else {
            //FIXME this should be a 'no results'
            let response = `There are an unexpected number of results for ${product}.`;
            responseJson = stringify({ "speech": response, "displayText": response});
          }
        } else{
          //FIXME this should be a 'no results'
          let response = `There are an unexpected number of results for ${product}.`;
          responseJson = stringify({ "speech": response, "displayText": response});
        }
        if (output.data.length !== 1){
          resolve(responseJson);
        }
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }
}

module.exports = SelectMultipleAction;
