var Immutable = require('immutable');

var quote = function(string) {
  return '"' + string.replace(/"/g, '\\"') + '"';
};

var list = function(start, values, end) {
  return start + values.join(',') + end;
};

exports.stringify = function stringify(argument) {
  if (typeof argument === 'string') {
    return quote(argument);
  } else if (Immutable.List.isList(argument)) {
    return list('[', argument.map(stringify), ']');
  } else if (Immutable.Map.isMap(argument)) {
    return list(
      '{',
      argument.keySeq()
        .sort() // Sorting of keys occurs here.
        .map(function(name) {
          return quote(name) + ':' + stringify(argument.get(name));
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

exports.parse = function(argument) {
  return Immutable.fromJS(JSON.parse(argument));
};

exports.version = '0.2.0';
