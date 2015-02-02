/* jshint node: true, mocha: true */
var expect = require('chai').expect;
var commonform = require('..');

describe('Stringification', function() {
  it('sorts object keys', function() {
    var ab = {a: '1', b: '2'};
    var ba = {b: '2', a: '1'};
    expect(commonform.stringify(ab))
      .to.equal(commonform.stringify(ba));
  });

  it('outputs valid JSON object', function() {
    var object = {a: '1'};
    var output = commonform.stringify(object);
    expect(JSON.parse(output))
      .to.eql(object);
  });

  it('outputs valid JSON array', function() {
    var object = {a: ['1', '2']};
    var output = commonform.stringify(object);
    expect(JSON.parse(output))
      .to.eql(object);
  });

  it('outputs valid JSON empty array', function() {
    var object = {a: []};
    var output = commonform.stringify(object);
    expect(JSON.parse(output))
      .to.eql(object);
  });

  it('escapes quotes', function() {
    var object = {a: '"this is a test"'};
    expect(commonform.stringify(object))
      .to.eql('{"a":"\\"this is a test\\""}');
  });

  var invalidValues = {
    'boolean': true,
    'number': 1,
    'null': null,
    'undefined': void 0
  };

  Object.getOwnPropertyNames(invalidValues).map(function(type) {
    it('throw error on ' + type, function() {
      expect(function() {
        commonform.stringify({a: invalidValues[type]});
      })
        .to.throw(
          'argument to commonform.stringify contains other than ' +
          'object, array, or string'
        );
    });
  });
});
