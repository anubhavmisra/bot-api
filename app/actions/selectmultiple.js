let stringify = require('json-stringify');
let mb = require('../lib/milkbasket');
let utils = require('../lib/requestutils');

class SelectMultipleAction{
  op(req, res){
    
    return new Promise((resolve, reject) => {
      let product = utils.getparameter(req, "product");
      let brand = utils.getparameter(req, "brand");
      let selectedWeight =  utils.getparameter(req, "selectedWeight");
      

      //console.log("p " + product + " b " + brand + " q " + selectedWeight);
      // Call the search api
      mb.callSearch(product, brand, selectedWeight).then((output) => {
        let responseJson = '';

        if(typeof output.data !== 'undefined' && output.data !== null){
          if (output.data.length === 1){
            //TODO: add this product to the basket

            //"speech" is the spoken version of the response, "displayText" is the visual version
            //Default response: show added product name
            let response = `I have added \'${output.data[0].nm}\' to your basket(Not really).`;
            responseJson = stringify({ "speech": response, "displayText": response});
          } else {
            //FIXME We do not like this case. The product should be found by the select
            let response = `There are an unexpected number of results for ${product}.`;
            responseJson = stringify({ "speech": response, "displayText": response});
          }
        } else{
          //FIXME We do not like this case. The product should be found by the select
          let response = `There are an unexpected number of results for ${product}.`;
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

module.exports = SelectMultipleAction;