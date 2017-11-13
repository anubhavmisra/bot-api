const ORDER_INTENT = 'OrderIntent';
const MULTIPLE_BRANDS = 'OrderIntent-MultipleBrands';
const SELECT_BRAND = ORDER_INTENT + '.'+ MULTIPLE_BRANDS + '.OrderIntent-MultipleBrands-select';
const SHOW_MORE_BRANDS = ORDER_INTENT + '.'+ MULTIPLE_BRANDS + '.OrderIntent-MultipleBrands-more';
const MULTIPLE_WEIGHTS = 'OrderIntent-MultipleWeights';
const SHOW_MORE_WEIGHTS = ORDER_INTENT + '.'+ MULTIPLE_WEIGHTS + '.OrderIntent-MultipleWeights-more';
const SELECT_WEIGHT = ORDER_INTENT + '.'+ MULTIPLE_WEIGHTS + '.OrderIntent-MultipleWeights-select';
const MULTIPLE_PRODUCTS = 'OrderIntent-MultipleProducts';
const SELECT_MULTIPRODUCT = ORDER_INTENT + '.'+ MULTIPLE_PRODUCTS + '.OrderIntent-MultipleProducts-select';
const SHOW_MORE_MULTIPRODUCT = ORDER_INTENT + '.'+ MULTIPLE_PRODUCTS + '.OrderIntent-MultipleProducts-more';
const GET_BASKET = 'basket.get';

function resolveAction(req){
  //Check result is defined
  if (typeof req.body.result !== 'undefined' && req.body.result !== null){
    // Retrieve action name from request
    let actionName = req.body.result.action;
    if(actionName === SELECT_MULTIPRODUCT){
      return 'selectmultiple';
    } else if(actionName === SHOW_MORE_MULTIPRODUCT){
      return 'showmoreproducts';
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
