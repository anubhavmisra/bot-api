var stringify = require('json-stringify');
var mb = require('../lib/milkbasket');

class SearchAction{
  op(req, res){
    return new Promise((resolve, reject) => {
      var product = req.body.result.parameters.product;

      // Call the search api
      mb.callSearch(product).then((output) => {
        var responseJson = '';
        if(output.data.length > 1){
          var response = 'I have found multiple products.';
          var productNames = output.data.map(function(product, index, array){
            return (index + 1) + '. ' +  product.nm;
          });

          //"followupEvent" to send the user to the next step
          responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
            "name": "product_multiple_results",
            "data": {
               "products":productNames.slice(0,3)
            }
          }});
        } else if (output.data.length == 1){
          //TODO: add this product to the basket

          //"speech" is the spoken version of the response, "displayText" is the visual version
          //Default response: show added product name
          var response = 'I have added \'' + output.data[0].nm + '\' to your basket(Not really).';
          responseJson = stringify({ "speech": response, "displayText": response});
        } else if (output.data.length < 1){
          //Default response: no results
          var response = 'I could not find any results for ' + product + '.';
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

module.exports = SearchAction;
