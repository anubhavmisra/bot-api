var search = require('./actions/search');
var select = require('./actions/select');
var showbasket = require('./actions/showbasket');
var checkexternalid = require('./actions/checkexternalid');
var showmorequantities = require('./actions/showmorequantities');
var selectquantity = require('./actions/selectquantity');

var actionFactory = {
  'search': new search(),
  'select': new select(),
  'showbasket': new showbasket(),
  'checkexternalid': new checkexternalid(),
  'showmorequantities': new showmorequantities(),
  'selectquantity': new selectquantity()
};

module.exports = actionFactory;
