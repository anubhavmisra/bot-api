//Change all var declarations to let
var stringify = require('json-stringify');
var utils = require('../lib/requestutils');
var mb = require('../lib/milkbasket');

class CheckExtId{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            var extid = utils.getexternalid(req); 

            //TODO: check extid at MB

            var response = 'Could not check in backend';
            var responseJson = stringify({ "speech": response, "displayText": response});
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    }
}
 
module.exports = CheckExtId;
