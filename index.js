var express = require('express');
var bodyParser = require('body-parser');

var actionresolver = require('./app/actionresolver');

//TODO: find actions dynamically
var search = require('./app/actions/search');
var select = require('./app/actions/select');

var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/api/order', function(req, res) {
  //FIXME: user authentication
  //FIXME: who can access this app? How do we limit this?

  console.log(req.body);

  //switch up logic based on "action" parameter
  var action = actionresolver.resolveAction(req);
  if(action === 'MultipleResults-selectnumber'){
    select.handleSelectNumber(req, res);
  } else {
    //Searching for a product is the default behaviour
    search.handleProductSearch(req, res);
  }
});

app.listen(process.env.PORT || 3001);
