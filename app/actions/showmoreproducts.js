let stringify = require('json-stringify');
let utils = require('../lib/requestutils');

class ShowMoreProductsAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            let response = 'I have found multiple brands.';
            //"followupEvent" to send the user to the next step
            
            let brands = utils.getparameter(req, 'moreProducts');
            brands = brands.concat(utils.getparameter(req, 'products'));

            let responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                "name": "product_multiple_products",
                "data": {
                    "products":brands.slice(0,3),
                    "hasMoreResults":'more',
                    "moreProducts":brands.slice(3)
                }
            }});
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    }
}
 
module.exports = ShowMoreProductsAction;
