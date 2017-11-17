let request = require('request');
let querystring = require('querystring');

let MB_API_URL = "http://dev.milkbasket.com";

//Call the search with query, brand, weight
function callSearch(query, brand, weight){
  return new Promise((resolve, reject) => {
    var options =  {
        uri: MB_API_URL + '/products/search',
        body: JSON.stringify({"search_text": query, "brand_name":brand, "weight":weight}),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    request(options, function (error, response) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(response.body));
      } else {
        console.log("Call to MB api failed: " + error);
        if(typeof response !== 'undefined'){
          console.log(" Status code :" + response.statusCode);
        }
        reject(error);
      }
    });
  });
}

function getbrands(output) {
  if(typeof output.data !== 'undefined' && output.data !== null){
    let brands = output.data.map(function(product, index, array){
      return product.brand_name;
    });
    //remove duplicates
    return uniq(brands);
  }
}

function getweights(output) {
  if(typeof output.data !== 'undefined' && output.data !== null){
      let weights = output.data.map(function(product, index, array){
        return product.wgt;
      });
      //remove duplicates
      return uniq(weights);
  }
}

function uniq(a) {
  let seen = {};
  return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

function order(userid, productid, quantity){
  return new Promise((resolve, reject) => {
    var options =  {
        uri: MB_API_URL + '/backend/v1/ConversationApi/order',
        method: 'POST',
        body: JSON.stringify({"facebookId": userid, "product_id":productid, "quantity":quantity}),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    request(options, function (error, response) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(response.body));
      } else {
        console.log("Call to MB api failed: " + error);
        if(typeof response !== 'undefined'){
          console.log(" Status code :" + response.statusCode);
          console.log(" response :" + response.body);
        }
        reject(error);
      }
    });
  });
}

function getbasket(userid){
  return new Promise((resolve, reject) => {
    queryobject = querystring.stringify({facebookId: userid});
    var options =  {
        uri: MB_API_URL + '/backend/v1/ConversationApi/getBasket?' + queryobject,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    request(options, function (error, response) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(response.body));
      } else {
        console.log("Call to MB api failed: " + error);
        if(typeof response !== 'undefined'){
          console.log(" Status code :" + response.statusCode);
        }
        reject(error);
      }
    });
  });
}

function getBasketItemNames(output) {
  if(typeof output.products !== 'undefined' && output.products !== null){
    let names = output.products.map(function(product, index, array){
      return `${product.name} X ${product.quantity}`;
    });
    return names;
  }
}  

function isValidUser(extid){
  return new Promise((resolve, reject) => {
    queryobject = querystring.stringify({facebookId: extid});
    var options =  {
        uri: MB_API_URL + '/backend/v1/ConversationApi/getProfile?' + queryobject,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    request(options, function (error, response) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(response.body));
      } else {
        if(typeof response !== 'undefined'){
          if(response.statusCode === 404){
            //Profile could not be found. Resolve with false.
            resolve(false);
          } else {
            reject(error);
          }
        } else {
          reject(error);
        }
      }
    });
  });
}

module.exports.callSearch = callSearch;
module.exports.getbrands = getbrands;
module.exports.getweights = getweights;
module.exports.order = order;
module.exports.getbasket = getbasket;
module.exports.getBasketItemNames = getBasketItemNames;
module.exports.isValidUser = isValidUser;

