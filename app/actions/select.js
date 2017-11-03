let stringify = require('json-stringify');
let mb = require('../lib/milkbasket');
let utils = require('../lib/requestutils');

class SelectAction{
  op(req, res){
    return new Promise((resolve, reject) => {
      let selectedNumber =  utils.getparameter(req, 'selectedNumber');
      
      //TODO: this should not be in the contexts but in the parameters
      let products = req.body.result.contexts[0].parameters.products;
      let selectedProduct = products[selectedNumber - 1].slice(3);

      // Call the search api
      mb.callSearch(selectedProduct).then((output) => {
        let responseJson = '';
        if(typeof output.data !== 'undefined' && output.data !== null){
          if (output.data.length === 1){
            //TODO: add this product to the basket

            //"speech" is the spoken version of the response, "displayText" is the visual version
            //Default response: show added product name
            let response = 'I have added \'' + output.data[0].nm + '\' to your basket(Not really).';
            responseJson = stringify({ "speech": response, "displayText": response,
              "contextOut": [{"name":"orderintent-followup", "lifespan":5, "parameters":{"product": selectedProduct}}]
            });
          } else {
            //FIXME We do not like this case. The product should be found by the select
            let response = 'There are an unexpected number of results for ' + selectedProduct + '.';
            responseJson = stringify({ "speech": response, "displayText": response});
          }
        } else{
          //FIXME We do not like this case. The product should be found by the select
          let response = 'There are an unexpected number of results for ' + selectedProduct + '.';
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
