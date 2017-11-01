var stringify = require('json-stringify');
var utils = require('../lib/requestutils');

class ShowBasketAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            var extid = utils.getexternalid(req); 

            //TODO: retrieve basket for this external id

            var response = 'This is your basket for tomorrow.';
            var responseJson = stringify({ "speech": response, "displayText": response});
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    }
}
 
module.exports = ShowBasketAction;
