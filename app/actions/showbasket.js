let stringify = require('json-stringify');
let utils = require('../lib/requestutils');
let mb = require('../lib/milkbasket');

class ShowBasketAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            var extid = utils.getexternalid(req); 

            //retrieve basket for this external id
            mb.getbasket(extid).then((output) => {
                let response = '';
                let responseJson = '';
                if(typeof output.products !== 'undefined' && output.products !== null){
                    if(output.products.length > 0){
                        response = "This is your basket for tomorrow";
                        let objects = mb.getBasketItemNames(output);
                        responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                            "name": "basket_results",
                            "data": {
                                "items":objects
                            }
                        }});
                    } else{
                        response = "Your basket for tomorrow is empty.";
                        responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                            "name": "basket_results"
                        }});
                    }
                }
                resolve(responseJson);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }
}
 
module.exports = ShowBasketAction;
