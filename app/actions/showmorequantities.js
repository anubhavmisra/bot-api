var stringify = require('json-stringify');
var utils = require('../lib/requestutils');

class ShowMoreQuantityAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            var response = 'I have found multiple quantities.';
            //"followupEvent" to send the user to the next step
            var quantities = req.body.result.parameters.morequantities;
            quantities = quantities.concat(req.body.result.parameters.quantities)

            var responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                "name": "product_multiple_quantities",
                "data": {
                    "quantities":quantities.slice(0,3),
                    "moreresults":'more',
                    "morequantities":quantities.slice(3)
                }
            }});
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    }
}
 
module.exports = ShowMoreQuantityAction;
