let express = require('express');
let bodyParser = require('body-parser');

let actionresolver = require('./app/actionresolver');
let actionfactory = require('./app/actionfactory');
let mb = require('./app/lib/milkbasket');
let utils = require('./app/lib/requestutils');

let app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/api/order', function(req, res) {
  console.log("Receiving request:");
  console.log(JSON.stringify(req.body,null,2));

  //TODO: check if user is already logged in
  //Only check id at backend if not found

  // user authentication first
  let extid = utils.getexternalid(req); 
  
  //FIXME: behaviour if ext id is empty?
  mb.isValidUser(extid).then((isValidUser) => {
    if(!isValidUser){
      let response = "It seems like you have not regisered your facebook account yet. Please go to " + 
      "http://www.milkbasket.com/facebook and register your account." ;
      responseJson = JSON.stringify({ "speech": response, "displayText": response});
      res.setHeader('Content-Type', 'application/json');
      res.send(responseJson);
    } else {
      let userid = isValidUser.id;
      //switch up logic based on "action" parameter
      let actionName = actionresolver.resolveAction(req);
      let action = actionfactory[actionName];

      action.op(req, res).then((responseJson)  => {
        parsedJson = JSON.parse(responseJson);
        //Add the userid to an 'out' context
        parsedJson.outputContexts = [{"name":"orderintent-followup", "lifespan":5, "parameters":[{"userid":userid}]}];
        
        console.log("Sending response:");
        console.log(JSON.stringify(parsedJson,null,2));
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(parsedJson));
      }).catch((error) => {
        //Let the user know if an error occurred
        console.log("Error: " + error);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
      });
    }
  }).catch((error) => {
    //Let the user know if an error occurred
    console.log("Error: " + error);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
  });
  
});

app.listen(process.env.PORT || 3001);
