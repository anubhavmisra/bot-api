var search = require('./actions/search');
var select = require('./actions/select');

function getAction(actionName){
  // return action object
  if(actionName === 'MultipleResults-selectnumber'){
    return new select.SelectAction();
  } else {
    return new search.SearchAction();
  }

}

module.exports.getAction = getAction;
