let express = require('express');
let bodyParser = require('body-parser');

let actionresolver = require('./app/actionresolver');
let actionfactory = require('./app/actionfactory');

let app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/api/order', function(req, res) {
  //FIXME: user authentication
  //FIXME: who can access this app? How do we limit this?

  console.log("Receiving request:");
  console.log(JSON.stringify(req.body,null,2));

  //switch up logic based on "action" parameter
  let actionName = actionresolver.resolveAction(req);
  let action = actionfactory[actionName];

  action.op(req, res).then((responseJson)  => {
    res.setHeader('Content-Type', 'application/json');
    console.log("Sending response:");
    console.log(JSON.stringify(responseJson,null,2));
    //TODO: maybe better to stringify here?
    res.send(responseJson);
  }).catch((error) => {
    //Let the user know if an error occurred
    console.log("Error: " + error);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
  });
});

app.listen(process.env.PORT || 3001);
