let stringify = require('json-stringify');
let utils = require('../lib/requestutils');
let mb = require('../lib/milkbasket');

class CheckExtId{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            let extid = utils.getexternalid(req); 

            //TODO: check extid at MB

            let response = 'Could not check in backend';
            let responseJson = stringify({ "speech": response, "displayText": response});
            resolve(responseJson);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    }
}
 
module.exports = CheckExtId;
