let search = require('./actions/search');
let selectmultiple = require('./actions/selectmultiple');
let showmoreproducts = require('./actions/showmoreproducts');
let showbasket = require('./actions/showbasket');
let showmoreweights = require('./actions/showmoreweights');
let selectweight = require('./actions/selectweight');
let showmorebrands = require('./actions/showmorebrands');
let selectbrand = require('./actions/selectbrand');
let generateOtp = require('./actions/generateOtp');
let verifyOtp = require('./actions/verifyOtp');

let actionFactory = {
  'search': new search(),
  'selectmultiple': new selectmultiple(),
  'showmoreproducts': new showmoreproducts(),
  'showbasket': new showbasket(),
  'showmoreweights': new showmoreweights(),
  'selectweight': new selectweight(),
  'showmorebrands': new showmorebrands(),
  'selectbrand': new selectbrand(),
  'generateOtp': new generateOtp()
};

module.exports = actionFactory;
