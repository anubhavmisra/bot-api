let search = require('./actions/search');
let selectmultiple = require('./actions/selectmultiple');
let showbasket = require('./actions/showbasket');
let checkexternalid = require('./actions/checkexternalid');
let showmoreweights = require('./actions/showmoreweights');
let selectweight = require('./actions/selectweight');
let showmorebrands = require('./actions/showmorebrands');
let selectbrand = require('./actions/selectbrand');

let actionFactory = {
  'search': new search(),
  'selectmultiple': new selectmultiple(),
  'showbasket': new showbasket(),
  'checkexternalid': new checkexternalid(),
  'showmoreweights': new showmoreweights(),
  'selectweight': new selectweight(),
  'showmorebrands': new showmorebrands(),
  'selectbrand': new selectbrand()
};

module.exports = actionFactory;
