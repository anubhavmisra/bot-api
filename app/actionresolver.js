const SELECT_MULTIRESULT = 'OrderIntent-MultipleResults-select';
const GET_BASKET = 'basket.get';
const SHOW_MORE_WEIGHTS = 'OrderIntent-MultipleWeights-more';
const SHOW_MORE_BRANDS = 'OrderIntent-MultipleBrands-more';
const SELECT_WEIGHT = 'OrderIntent-MultipleWeights-select';
const SELECT_BRAND = 'OrderIntent-MultipleBrands-select';

function resolveAction(req){
  //Check result is defined
  if (typeof req.body.result !== 'undefined' && req.body.result !== null){
    // Retrieve action name from request
    let actionName = req.body.result.action;
    if(actionName === SELECT_MULTIRESULT){
      return 'selectmultiple';
    } else if(actionName === GET_BASKET){
      return 'showbasket';
    } else if(actionName === SHOW_MORE_WEIGHTS){
      return 'showmoreweights';
    } else if(actionName === SELECT_WEIGHT){
      return 'selectweight';
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
