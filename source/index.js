var isArray = require('is-array');
var isObject = require('is-object');

var quote = function(string) {
  return '"' + string.replace(/"/g, '\\"') + '"';
};

var list = function(start, values, end) {
  return start + values.join(',') + end;
};

exports.stringify = function stringify(argument) {
  if (typeof argument === 'string') {
    return quote(argument);
  } else if (isArray(argument)) {
    return list('[', argument.map(stringify), ']');
  } else if (isObject(argument)) {
    return list(
      '{',
      Object.keys(argument)
        .sort() // Sorting of keys occurs here.
        .map(function(name) {
          return quote(name) + ':' + stringify(argument[name]);
        }),
      '}'
    );
  } else {
    throw new TypeError(
      'argument to stringify contains other than object, array, or ' +
      'string'
    );
  }
};

exports.parse = JSON.parse.bind(JSON);

exports.version = '0.4.0';
