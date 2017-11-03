let stringify = require('json-stringify');
let mb = require('../lib/milkbasket');
let utils = require('../lib/requestutils');

class SearchAction{
  op(req, res){
    return new Promise((resolve, reject) => {
      let product = utils.getparameter(req, 'product');

      // Call the search api
      mb.callSearch(product).then((output) => {
        let responseJson = '';
        if(typeof output.data !== 'undefined' && output.data !== null){
          if(output.data.length > 1){
            //TODO: brand selection result

            //quantity selection result
            let quantities = getquantities(output); 
            console.log("Found " + quantities.length + " quantities");
            if (quantities.length > 1){
              responseJson = getQuantitiesResponse(quantities);
            } else {
              //send a regular 'multiple results' response
              responseJson = getMultipleResultsResponse(output);
            }
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

function getquantities(output) {
  if(typeof output.data !== 'undefined' && output.data !== null){
    let quantities = output.data.map(function(product, index, array){
      return product.wgt;
    });
    //remove duplicates
    return uniq(quantities);
  }
}

function uniq(a) {
  let seen = {};
  return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

function getQuantitiesResponse(quantities){
  let response = 'I have found multiple quantities.';
  let more = '';
  let morequantities = [];
  if(quantities.length > 3){
    more = 'more';
    morequantities = quantities.slice(3);
  }

  //"followupEvent" to send the user to the next step
  responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
    "name": "product_multiple_quantities",
    "data": {
      "quantities":quantities.slice(0,3),
      "moreresults":more,
      "morequantities":morequantities
    }
  }});
  return responseJson;
  
}

function getMultipleResultsResponse(output){
  let response = 'I have found multiple products.';
  let responseJson = '';
  if(typeof output.data !== 'undefined' && output.data !== null){
    let productNames = output.data.map(function(product, index, array){
      return (index + 1) + '. ' +  product.nm;
    });

    //"followupEvent" to send the user to the next step
    responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
      "name": "product_multiple_results",
      "data": {
        "products":productNames.slice(0,3)
      }
    }});
  }
  return responseJson;
}

module.exports = SearchAction;
