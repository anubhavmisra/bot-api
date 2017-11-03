function getexternalid(req){
  let extid = '';
  //What is the source of this request?
  if(req.body.hasOwnProperty('originalRequest')){
    //Case facebook  
    if(req.body.originalRequest.source === 'facebook'){
      extid = req.body.originalRequest.data.sender.id;
      console.log('facebook request from user ' + extid);
    }
  }
  return extid;
}

function getparameter(req, parametername){
    let paramValue = '';
    //Check result is defined
    if (typeof req.body.result !== 'undefined' && req.body.result !== null){
        if (typeof req.body.result.parameters !== 'undefined' && req.body.result.parameters !== null){
            paramValue = req.body.result.parameters[parametername];
        }
    }
    return paramValue;
}

module.exports.getexternalid = getexternalid;
module.exports.getparameter = getparameter;
