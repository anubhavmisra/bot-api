var search = require('./actions/search');
var select = require('./actions/select');
var showbasket = require('./actions/showbasket');
var checkexternalid = require('./actions/checkexternalid');

var actionFactory = {
  'search': new search(),
  'select': new select(),
  'showbasket': new showbasket(),
  'checkexternalid': new checkexternalid()
};

module.exports = actionFactory;
