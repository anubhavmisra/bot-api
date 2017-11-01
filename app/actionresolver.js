//var stringify = require('json-stringify');

function resolveAction(req){
  // Retrieve action name from request
  var actionName = req.body.result.action;
  if(actionName === 'MultipleResults-selectnumber'){
    return 'select';
  }if(actionName === 'basket.get'){
    return 'showbasket';
  }
  else {
    return 'search';
  }
}

module.exports.resolveAction = resolveAction;
