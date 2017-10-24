var search = require('./actions/search');
var select = require('./actions/select');

var actionFactory = {
  'search': new search.SearchAction(),
  'select': new select.SelectAction()
}

module.exports.actionFactory = actionFactory;
