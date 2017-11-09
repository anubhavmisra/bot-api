let request = require('request');

//TODO: this should be called with query, brand, quantity (Or possibly just search params)
function callSearch(query, brand, quantity){
  return new Promise((resolve, reject) => {
    var options =  {
        uri: 'http://dev.milkbasket.com/products/search',
        body: JSON.stringify({"search_text": query, "brand_name":brand, "weight":quantity}),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    request(options, function (error, response) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(response.body));
      } else {
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

module.exports.callSearch = callSearch;
module.exports.getbrands = getbrands;
module.exports.getquantities = getquantities;
