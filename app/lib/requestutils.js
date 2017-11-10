let stringify = require('json-stringify');

function getexternalid(req){
  let extid = '';
  //What is the source of this request?
  if(req.body.hasOwnProperty('originalRequest')){
    //Case facebook  
    if(req.body.originalRequest.source === 'facebook'){
      extid = req.body.originalRequest.data.sender.id;
      console.log('facebook request from user ' + extid);
    }
  }
  return extid;
}

function getparameter(req, parametername){
    let paramValue = '';
    //Check result is defined
    if (typeof req.body.result !== 'undefined' && req.body.result !== null){
        if (typeof req.body.result.parameters !== 'undefined' && req.body.result.parameters !== null){
            paramValue = req.body.result.parameters[parametername];
        }
    }
    return paramValue;
}

function getBrandsResponse(brands){
  let response = 'I have found multiple brands.';
  let more = '';
  let morebrands = [];
  if(brands.length > 3){
    more = 'more';
    morebrands = brands.slice(3);
  }

  //"followupEvent" to send the user to the next step
  responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
    "name": "product_multiple_brands",
    "data": {
      "brands":brands.slice(0,3),
      "moreresults":more,
      "morebrands":morebrands
    }
  }});
  return responseJson;
}

function getWeightsResponse(weights){
  let response = 'I have found multiple weights.';
  let more = '';
  let moreweights = [];
  if(weights.length > 3){
    more = 'more';
    moreweights = weights.slice(3);
  }

  //"followupEvent" to send the user to the next step
  responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
    "name": "product_multiple_weights",
    "data": {
      "weights":weights.slice(0,3),
      "moreresults":more,
      "moreweights":moreweights
    }
  }});
  return responseJson;  
}

function getMultipleResultsResponse(output){
  let response = 'I have found multiple products.';
  let responseJson = '';
  if(typeof output.data !== 'undefined' && output.data !== null){
    let productNames = output.data.map(function(product, index, array){
      return product.nm;
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


module.exports.getexternalid = getexternalid;
module.exports.getparameter = getparameter;
module.exports.getBrandsResponse = getBrandsResponse;
module.exports.getWeightsResponse = getWeightsResponse;
module.exports.getMultipleResultsResponse = getMultipleResultsResponse;
