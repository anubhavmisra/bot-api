var search = require('./actions/search');
var select = require('./actions/select');

var actionFactory = {
  'search': new search(),
  'select': new select()
}

module.exports = actionFactory;
