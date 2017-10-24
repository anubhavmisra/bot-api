var assert = require('should');
describe('search', function () {
  it('should return no search items', function () {
    //FIXME: Assert that the search results are valid
    var results = [];
    results.length.should.equal(0);
  });
  it('should return a single search item', function () {
    //FIXME: Assert that the search results are valid
    var results = [1];
    results.length.should.equal(1);
  });
  it('should return multiple search items', function () {
    //FIXME: Assert that the search results are valid
    var results = [1, 2];
    results.length.should.aboveOrEqual(2);
  });
});