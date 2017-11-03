let search = require('./actions/search');
let select = require('./actions/select');
let showbasket = require('./actions/showbasket');
let checkexternalid = require('./actions/checkexternalid');
let showmorequantities = require('./actions/showmorequantities');
let selectquantity = require('./actions/selectquantity');
let showmorebrands = require('./actions/showmorebrands');
let selectbrand = require('./actions/selectbrand');

let actionFactory = {
  'search': new search(),
  'select': new select(),
  'showbasket': new showbasket(),
  'checkexternalid': new checkexternalid(),
  'showmorequantities': new showmorequantities(),
  'selectquantity': new selectquantity(),
  'showmorebrands': new showmorebrands(),
  'selectbrand': new selectbrand()
};

module.exports = actionFactory;
