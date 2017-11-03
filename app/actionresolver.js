const SELECT_MULTIRESULT = 'MultipleResults-selectnumber';
const GET_BASKET = 'basket.get';
const SHOW_MORE_QUANTITIES = 'OrderIntent-MultipleQuantities-more';
const SHOW_MORE_BRANDS = 'OrderIntent-MultipleBrands-more';
const SELECT_QUANTITY = 'OrderIntent-MultipleQuantities-select';
const SELECT_BRAND = 'OrderIntent-MultipleBrands-select';

function resolveAction(req){
  //Check result is defined
  if (typeof req.body.result !== 'undefined' && req.body.result !== null){
    // Retrieve action name from request
    let actionName = req.body.result.action;
    if(actionName === SELECT_MULTIRESULT){
      return 'select';
    } else if(actionName === GET_BASKET){
      return 'showbasket';
    } else if(actionName === SHOW_MORE_QUANTITIES){
      return 'showmorequantities';
    } else if(actionName === SELECT_QUANTITY){
      return 'selectquantity';
    } else if(actionName === SHOW_MORE_BRANDS){
      return 'showmorebrands';
    } else if(actionName === SELECT_BRAND){
      return 'selectbrand';
    } else {
      //Default action is searching for product
      return 'search';
    }
  }
}

module.exports.resolveAction = resolveAction;
