//Change all var declarations to let
//var stringify = require('json-stringify');

function resolveAction(req){
  // Retrieve action name from request
  var actionName = req.body.result.action; //Null check missing
  if(actionName === 'MultipleResults-selectnumber'){ //Better if these can be moved to constant enums. eg. const MULTIRESULT_SELECT = 'MultipleResults-selectnumber';
    return 'select';
  } else if(actionName === 'basket.get'){
    return 'showbasket';
  } else if(actionName === 'OrderIntent-MultipleQuantities.OrderIntent-MultipleQuantities-more'){
    return 'showmorequantities';
  } else if(actionName === 'OrderIntent-MultipleQuantities-select'){
    return 'selectquantity';
  }
  else {
    return 'search';
  }
}

module.exports.resolveAction = resolveAction;
