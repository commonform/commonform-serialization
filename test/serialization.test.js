/* jshint node: true, mocha: true */
var Immutable = require('immutable');
var expect = require('chai').expect;
var serialize = require('..');

var fromJS = Immutable.fromJS.bind(Immutable);

describe('Stringification', function() {
  it('sorts object keys', function() {
    var ab = fromJS({a: '1', b: '2'});
    var ba = fromJS({b: '2', a: '1'});
    expect(serialize.stringify(ab))
      .to.equal(serialize.stringify(ba));
  });

  it('outputs valid JSON object', function() {
    var object = fromJS({a: '1'});
    var output = serialize.stringify(object);
    expect(JSON.parse(output))
      .to.eql(object.toJS());
  });

  it('outputs valid JSON array', function() {
    var object = Immutable.fromJS({a: ['1', '2']});
    var output = serialize.stringify(object);
    expect(JSON.parse(output))
      .to.eql(object.toJS());
  });

  it('outputs valid JSON empty array', function() {
    var object = Immutable.fromJS({a: []});
    var output = serialize.stringify(object);
    expect(JSON.parse(output))
      .to.eql(object.toJS());
  });

  it('escapes quotes', function() {
    var object = fromJS({a: '"this is a test"'});
    expect(serialize.stringify(object))
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
        serialize.stringify(fromJS({a: invalidValues[type]}));
      })
        .to.throw(
          'argument to stringify contains other than object, array, ' +
          'or string'
        );
    });
  });

  it('round-trips', function() {
    var ab = fromJS({a: '1', b: '2'});
    expect(serialize.parse(serialize.stringify(ab)))
      .to.eql(ab);
  });
});
