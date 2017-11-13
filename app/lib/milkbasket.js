let request = require('request');

//TODO: this should be called with query, brand, weight (Or possibly just search params)
function callSearch(query, brand, weight){
  return new Promise((resolve, reject) => {
    var options =  {
        uri: 'http://dev.milkbasket.com/products/search',
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
        console.log("Call to MB api failed: " + error + " Status code : " + response.statusCode);
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

module.exports.callSearch = callSearch;
module.exports.getbrands = getbrands;
module.exports.getweights = getweights;
