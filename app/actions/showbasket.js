let stringify = require('json-stringify');
let utils = require('../lib/requestutils');
let mb = require('../lib/milkbasket');

class ShowBasketAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            var extid = utils.getexternalid(req); 

            //TODO: retrieve basket for this external id

            var response = 'This is your basket for tomorrow.';
            var responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                "name": "basket_results",
                "data": {
                    "items": [
                        "Item 1",
                        "Item 2",
                        "Item 3"
                    ]
                }
            }});
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    }
}
 
module.exports = ShowBasketAction;
