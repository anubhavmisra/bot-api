let stringify = require('json-stringify');
let mb = require('../lib/milkbasket');
let utils = require('../lib/requestutils');

//Action to perform a search for the specified product
class SearchAction{
  op(req, res){
    return new Promise((resolve, reject) => {
      let product = utils.getparameter(req, 'product');

      // Call the search api
      mb.callSearch(product).then((output) => {
        let responseJson = '';
        if(typeof output.data !== 'undefined' && output.data !== null){
          if(output.data.length > 1){
            //Are there muliple brands?
            let brands = mb.getbrands(output);
            if(brands.length > 1){
              responseJson = utils.getBrandsResponse(brands);
            } else {
              //Are there muliple weigths?
              let weights = mb.getweights(output); 
              console.log("Found " + weights.length + " weights");
              if (weights.length > 1){
                responseJson = utils.getWeightsResponse(weights);
              } else {
                //send a regular 'multiple results' response
                responseJson = utils.getMultipleResultsResponse(output);
              }
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
          } else if (output.data.length < 1){
            //Default response: no results
            let response = `I could not find any results for ${product}.`;
            responseJson = stringify({ "speech": response, "displayText": response});
          }
        } else {
          let response = `I could not find any results for ${product}.`;
          responseJson = stringify({ "speech": response, "displayText": response});
        }
        if(output.data.length !== 1){
          resolve(responseJson);
        }
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }
}

module.exports = SearchAction;
