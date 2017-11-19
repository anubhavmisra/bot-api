let stringify = require('json-stringify');
let utils = require('../lib/requestutils');

//Action to show the next 3 weights
class ShowMoreWeightAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            let response = 'I have found multiple weights.';
            //"followupEvent" to send the user to the next step
            
            let weights = utils.getparameter(req, 'moreWeights');
            weights = weights.concat(utils.getparameter(req, 'weights'));

            let responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                "name": "product_multiple_weights",
                "data": {
                    "weights":weights.slice(0,3),
                    "hasMoreResults":'more',
                    "moreWeights":weights.slice(3)
                }
            }});
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    }
}
 
module.exports = ShowMoreWeightAction;
