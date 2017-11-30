var should = require('should');
var actionfactory = require('../../app/actionfactory');
var action = actionfactory['search'];
var _ = require('lodash');

describe('search', function () {
  it('should return no search items', function (done) {
    var request = {
      "body": {
        "result": {
          "parameters": { "product": "jesus" }
        }
      }
    };
    var expectedResponse = {
      "speech": "I could not find any results for jesus.",
      "displayText": "I could not find any results for jesus."
    };


    action.op(request, expectedResponse).then((responseJson) => {
      var response = JSON.parse(responseJson);
      should.exist(response);
      should(response).has.property('speech');
      should(response).has.property('displayText');
      should(expectedResponse.speech).equal(response.speech);
      should(expectedResponse.displayText).equal(response.displayText);
      done();
    }).catch((error) => {
      //Test should fail
      done(error);
    });
  });
  it('should return a single search item', function (done) {
    var request = {
      "body": {
        "result": {
          "parameters": { "product": "Harvest Gold 100% Atta Bread" }
        }
      }
    };
    var expectedResponse = {
      "speech": "I have added 'Harvest Gold 100% Atta Bread' to your basket(Not really).",
      "displayText": "I have added 'Harvest Gold 100% Atta Bread' to your basket(Not really)."
    };


    action.op(request, expectedResponse).then((responseJson) => {
      var response = JSON.parse(responseJson);
      should.exist(response);
      should(response).has.property('speech');
      should(response).has.property('displayText');
      should(expectedResponse.speech).equal(response.speech);
      should(expectedResponse.displayText).equal(response.displayText);
      done();
    }).catch((error) => {
      //Test should fail
      done(error);
    });
  });
  it('should return multiple search items', function (done) {
    var request = {
      "body": {
        "result": {
          "parameters": { 
            "product": "amul milk",
          }
        }
      }
    };
    action.op(request, null).then((responseJson) => {
      var response = JSON.parse(responseJson);
      should.exist(response);
      should(response).has.property('speech');
      should(response).has.property('displayText');
      should(response).has.property('followupEvent');
      should(response.followupEvent).has.property('name');
      should(response.followupEvent).has.property('data');
      should(response.followupEvent.data).has.property('products');
      should(response.followupEvent.data).has.property('hasMoreResults');
      should(response.followupEvent.data).has.property('moreProducts');
      done();
    }).catch((error) => {
      //Test should fail
      done(error);
    });
  });
  it('should return items with multiple brands', function (done) {
    var request = {
      "body": {
        "result": {
          "parameters": { "product": "bread" }
        }
      }
    };
    action.op(request, null).then((responseJson) => {
      var response = JSON.parse(responseJson);
      should.exist(response);
      should(response).has.property('speech');
      should(response).has.property('displayText');
      should(response).has.property('followupEvent');
      should(response.followupEvent).has.property('name');
      should(response.followupEvent).has.property('data');
      should(response.followupEvent.data).has.property('brands');
      should(response.followupEvent.data).has.property('hasMoreResults');
      should(response.followupEvent.data).has.property('moreBrands');
      done();
    }).catch((error) => {
      //Test should fail
      done(error);
    });
  });
  it('should return items with multiple quantities', function (done) {
    var request = {
      "body": {
        "result": {
          "parameters": { "product": "eggs bajaj brown" }
        }
      }
    };
    action.op(request, null).then((responseJson) => {
      var response = JSON.parse(responseJson);
      should.exist(response);
      should(response).has.property('speech');
      should(response).has.property('displayText');
      should(response).has.property('followupEvent');
      should(response.followupEvent).has.property('name');
      should(response.followupEvent).has.property('data');
      should(response.followupEvent.data).has.property('weights');
      should(response.followupEvent.data).has.property('hasMoreResults');
      should(response.followupEvent.data).has.property('moreWeights');
      done();
    }).catch((error) => {
      //Test should fail
      done(error);
    });
  });
});