let search = require('./actions/search');
let select = require('./actions/select');
let showbasket = require('./actions/showbasket');
let checkexternalid = require('./actions/checkexternalid');
let showmorequantities = require('./actions/showmorequantities');
let selectquantity = require('./actions/selectquantity');

let actionFactory = {
  'search': new search(),
  'select': new select(),
  'showbasket': new showbasket(),
  'checkexternalid': new checkexternalid(),
  'showmorequantities': new showmorequantities(),
  'selectquantity': new selectquantity()
};

module.exports = actionFactory;
