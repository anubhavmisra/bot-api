let stringify = require('json-stringify');
let utils = require('../lib/requestutils');
let mb = require('../lib/milkbasket');

//Action to retrieve verify otp code and add facebook id to user
class VerifyOtpAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            var extid = utils.getexternalid(req);
            var mobile = utils.getparameter(req, 'mobile');
            var otp = utils.getparameter(req, 'otp');
            
            //retrieve basket for this external id
            mb.verifyOTP(extid, mobile, otp).then((output) => {
                let response = "Your account has been verified.";
                let responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                    "name": "otp_verified"
                }});
                resolve(responseJson);
            }).catch((error) => {
                console.log(error)
                let response = "Your account could not be verified.";
                let responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                    "name": "otp_not_verified"
                }});
                resolve(responseJson);
            });
        });
    }
}
 
module.exports = VerifyOtpAction;
