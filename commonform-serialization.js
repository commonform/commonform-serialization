var quote = function(string) {
  return '"' + string.replace(/"/g, '\\"') + '"';
};

var list = function(start, values, end) {
  return start + values.join(',') + end;
};

var toString = Object.prototype.toString;

exports.stringify = function stringify(argument) {
  switch (toString.call(argument)) {
    case '[object String]':
      return quote(argument);
    case '[object Array]':
      return list('[', argument.map(stringify), ']');
    case '[object Object]':
      return list(
        '{',
        Object.getOwnPropertyNames(argument)
          .sort() // Sorting of keys occurs here.
          .map(function(name) {
            return quote(name) + ':' + stringify(argument[name]);
          }),
        '}'
      );
    default:
      throw new TypeError(
        'argument to commonform.stringify contains other than ' +
        'object, array, or string'
      );
  }
};

exports.parse = JSON.parse.bind(JSON);
