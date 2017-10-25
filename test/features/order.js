var assert = require('should');
describe('order product', function () {
    describe('foundNone', function () {
        it('should return no search items', function () {
            //FIXME: Assert that the search results are valid
            var results = [];
            results.length.should.equal(0);
        });
    });
    describe('exactMatchAndAdded', function () {
        it('should return one search item and add to basket', function () {
            //FIXME: Assert that the search results are valid
            var results = [];
            results.length.should.equal(0);
        });
    });
    describe('foundMultiple', function () {
        describe('foundMultipleBrands', function () {
            it('should return more than one search item with same product name but different brand names ', function () {
                //FIXME: Assert that the search results are valid
                var results = [];
                results.length.should.equal(0);
            });
        });
        describe('foundMultipleVariants', function () {
            it('should return more than one search item with same product name but difference in some other attribute', function () {
                //FIXME: Assert that the search results are valid
                var results = [];
                results.length.should.equal(0);
            });
        });

    });
});