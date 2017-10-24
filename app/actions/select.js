var stringify = require('json-stringify');

function handleSelectNumber(req, res){
  var selectedNumber =  req.body.result.parameters['selectedNumber'];
  var products = req.body.result.contexts[0].parameters['products'];
  var selectedProduct = products[selectedNumber - 1].slice(2);

  //FIXME: callSearch is not local anymore. Where do we put these utility functions?
  callSearch(selectedProduct).then((output) => {
    if (output.data.length == 1){
      //TODO: add this product to the basket

      //"speech" is the spoken version of the response, "displayText" is the visual version
      //Default response: show added product name
      var response = 'I have added \'' + output.data[0].nm + '\' to your basket(Not really).';
      var responseJson = stringify({ "speech": response, "displayText": response});
    } else {
      //FIXME We do not like this case. The product should be found by the select
      var response = 'There are an unexpected number of results for ' + selectedProduct + '.';
      var responseJson = stringify({ "speech": response, "displayText": response});

    }
    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
    res.send(responseJson);
  }).catch((error) => {
    console.log(error);
    // If there is an error let the user know
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
  });
}
