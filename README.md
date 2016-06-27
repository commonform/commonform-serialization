```javascript
var serialize = require('commonform-serialize')
```

Sorts object keys:

```javascript
var assert = require('assert')
assert.deepEqual(
  serialize.stringify({a: '1', b: '2'}),
  serialize.stringify({b: '2', a: '1'})
)
```

Outputs valid JSON `String`, `Object`, and `Array`:

```javascript
var a1 = {a: '1'}
assert.deepEqual(
  JSON.parse(serialize.stringify(a1)),
  a1
)

var a12 = {a: ['1', '2']}
assert.deepEqual(
  JSON.parse(serialize.stringify(a12)),
  a12
)

var aEmpty = { a: [ ] }
assert.deepEqual(
  JSON.parse(serialize.stringify(aEmpty)),
  aEmpty
)
```

Escapes quotation marks:

```javascript
assert.deepEqual(
  serialize.stringify({a: '"this is a test"'}),
  '{"a":"\\"this is a test\\""}'
)
```

Throw errors for non-`String`, non-`Object`, non-`Array` content:

```javascript
var invalidValues = {
  'boolean': true,
  'number': 1,
  'null': null,
  'undefined': void 0
}

Object.getOwnPropertyNames(invalidValues).map(function (type) {
  assert.throws(
    function () {
      serialize.stringify({ a: invalidValues[type] })
    },
    'argument to stringify contains other than object, array, ' +
    'or string'
  )
})
```
