var express = require('express');
var bodyParser = require('body-parser');

var actionresolver = require('./app/actionresolver');
var actionfactory = require('./app/actionfactory');

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
  var actionName = actionresolver.resolveAction(req);
  var action = actionfactory.actionFactory[actionName];

  action.op(req, res);
});

app.listen(process.env.PORT || 3001);
