var stringify = require('json-stringify');
var mb = require('../lib/milkbasket');

class SelectAction{
  op(req, res){
    return new Promise((resolve, reject) => {
      var selectedNumber =  req.body.result.parameters.selectedNumber;
      var products = req.body.result.contexts[0].parameters.products;
      var selectedProduct = products[selectedNumber - 1].slice(3);

      // Call the search api
      mb.callSearch(selectedProduct).then((output) => {
        var responseJson = '';
        if (output.data.length == 1){
          //TODO: add this product to the basket

          //"speech" is the spoken version of the response, "displayText" is the visual version
          //Default response: show added product name
          var response = 'I have added \'' + output.data[0].nm + '\' to your basket(Not really).';
          responseJson = stringify({ "speech": response, "displayText": response,
            "contextOut": [{"name":"orderintent-followup", "lifespan":5, "parameters":{"product": selectedProduct}}]
          });
        } else {
          //FIXME We do not like this case. The product should be found by the select
          var response = 'There are an unexpected number of results for ' + selectedProduct + '.';
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

module.exports = SelectAction;
