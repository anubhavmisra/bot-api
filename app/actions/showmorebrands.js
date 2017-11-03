let stringify = require('json-stringify');
let utils = require('../lib/requestutils');

class ShowMoreBrandAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            let response = 'I have found multiple brands.';
            //"followupEvent" to send the user to the next step
            
            let brands = utils.getparameter(req, 'morebrands');
            brands = brands.concat(utils.getparameter(req, 'brands'));

            let responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                "name": "product_multiple_brands",
                "data": {
                    "brands":brands.slice(0,3),
                    "moreresults":'more',
                    "morebrands":brands.slice(3)
                }
            }});
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    }
}
 
module.exports = ShowMoreBrandAction;
