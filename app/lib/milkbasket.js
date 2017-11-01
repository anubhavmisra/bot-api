var request = require('request');

//TODO: this should be called with query, brand, quantity (Or possibly just search params)
function callSearch(query){
  return new Promise((resolve, reject) => {
    var options =  {
        uri: 'http://milkbasket.com/products/search',
        body: JSON.stringify({"search_text": query}),
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

module.exports.callSearch = callSearch;
