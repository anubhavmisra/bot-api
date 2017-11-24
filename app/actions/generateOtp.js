let stringify = require('json-stringify');
let utils = require('../lib/requestutils');
let mb = require('../lib/milkbasket');

//Action to retrieve basker for current user
class GenerateOtpAction{
    op(req, res){
        return new Promise((resolve, reject) => {
            
            var extid = utils.getexternalid(req);
            var mobile = utils.getparameter(req, 'mobile');

            //retrieve basket for this external id
            mb.getOTP(extid, mobile).then((output) => {
                let responseJson = "";
                if(output === false){
                    let response = "Phone number not found.";
                    responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                        "name": "otp_not_sent"
                    }});
                } else {
                    let response = "An OTP has been sent to your number.";
                    responseJson = stringify({ "speech": response, "displayText": response, "followupEvent": {
                        "name": "otp_sent"
                    }});
                }
                resolve(responseJson);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }
}
 
module.exports = GenerateOtpAction;
