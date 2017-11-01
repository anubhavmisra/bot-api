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

  //What is the source of this request?
  if(req.body.hasOwnProperty('originalRequest')){
    if(req.body.originalRequest.source === 'facebook'){
      var fbid = req.body.originalRequest.data.sender.id;
      console.log('facebook request from user ' + fbid);
    }
  }

  console.log(JSON.stringify(req.body,null,2));

  //switch up logic based on "action" parameter
  var actionName = actionresolver.resolveAction(req);
  var action = actionfactory[actionName];

  action.op(req, res).then((responseJson)  => {
    res.setHeader('Content-Type', 'application/json');
    //TODO: maybe better to stringify here?
    res.send(responseJson);
  }).catch((error) => {
    //Let the user know if an error occurred
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
  });
});

app.listen(process.env.PORT || 3001);
