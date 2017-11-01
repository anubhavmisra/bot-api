var search = require('./actions/search');
var select = require('./actions/select');
var showbasket = require('./actions/showbasket');

var actionFactory = {
  'search': new search(),
  'select': new select(),
  'showbasket': new showbasket()
};

module.exports = actionFactory;
