//var stringify = require('json-stringify');

function resolveAction(req){
  // Retrieve action name from request
  return req.body.result.action;
}

module.exports.resolveAction = resolveAction;
