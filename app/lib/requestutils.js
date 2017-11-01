function getexternalid(req){
  var extid = '';
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

module.exports.getexternalid = getexternalid;
