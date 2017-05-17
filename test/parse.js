var assert = require('assert');
var parse = require('../lib').parse;
var lexer = require('../lib').lexer;
var translate = require('../lib').translate;
var forEachParseTest = require('./fixture/parse').forEachTest;
var stringify = require('./helpers/stringify');

describe('parse', function() {
    describe('basic', function() {
        forEachParseTest(function createParseTest(name, test) {
            it(name, function() {
                var ast = parse(test.source, test.options);

                // AST should be equal
                assert.equal(stringify(ast), stringify(test.ast));

                // translated AST should be equal to original source
                assert.equal(translate(ast), 'translate' in test ? test.translate : test.source);

                // structure should be ok
                assert.equal(lexer.checkStructure(ast), false);
            });
        });
    });
});
