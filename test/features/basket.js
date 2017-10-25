var assert = require('should');
describe('show basket', function () {
    describe('empty basket', function () {
        it('should return no search items', function () {
            //FIXME: Assert that the search results are valid
            var results = [];
            results.length.should.equal(0);
        });
    });
    describe('basket with more than one items', function () {
        it('should return more than one search item', function () {
            //FIXME: Assert that the search results are valid
            var results = [1,2];
            results.length.should.aboveOrEqual(2);
        });
    });
});