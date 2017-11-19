//Library for utility functions on DialogFlow requests
let stringify = require('json-stringify');

//Retrieve external ID for user
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

//Retrieve user id for a user that has already been verified in MB backend
function getloggedinuser(req){
  let userid = '';
  let contexts = req.body.result.contexts;
  if(typeof contexts !== 'undefined'){
    let usercontext = contexts.filter(function(item) { return item.name === 'usercontext_mb'; });
    if(usercontext.length > 0){
      userid = usercontext[0].parameters.userid;
      console.log('request from logged in user ' + userid);
    }
  }
  return userid;
}

//Retrieve a parameter from request
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

//Construct response JSON for multiple brands
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
      "hasMoreResults":more,
      "moreBrands":morebrands
    }
  }});

  return responseJson;
}

//Construct response JSON for multiple weights
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
      "hasMoreResults":more,
      "moreWeights":moreweights
    }
  }});
  return responseJson;  
}

//Construct response JSON for multiple results
function getMultipleResultsResponse(output){
  let response = 'I have found multiple products.';
  let responseJson = '';
  if(typeof output.data !== 'undefined' && output.data !== null){
    let productNames = output.data.map(function(product, index, array){
      return product.nm;
    });

    let more = '';
    let moreProducts = [];
    if(productNames.length > 3){
      more = 'more';
      moreProducts = productNames.slice(3);
    }
  
    //"followupEvent" to send the user to the next step
    responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
      "name": "product_multiple_products",
      "data": {
        "products":productNames.slice(0,3),
        "hasMoreResults":more,
        "moreProducts":moreProducts
      }
    }});
  }
  return responseJson;
}


module.exports.getexternalid = getexternalid;
module.exports.getparameter = getparameter;
module.exports.getloggedinuser = getloggedinuser;
module.exports.getBrandsResponse = getBrandsResponse;
module.exports.getWeightsResponse = getWeightsResponse;
module.exports.getMultipleResultsResponse = getMultipleResultsResponse;
