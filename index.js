/* Copyright 2015 Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var isArray = require('is-array')
var isObject = require('is-object')

var quote = function(string) {
  return ( '"' + string.replace(/"/g, '\\"') + '"' ) }

var list = function(start, values, end) {
  return ( start + values.join(',') + end ) }

exports.stringify = function stringify(argument) {
  if (typeof argument === 'string') {
    return quote(argument) }
  else if (isArray(argument)) {
    return list('[', argument.map(stringify), ']') }
  else if (isObject(argument)) {
    return list(
      '{',
      Object.keys(argument)
        .sort() // Sorting of keys occurs here.
        .map(function(name) {
          return ( quote(name) + ':' + stringify(argument[name]) ) }),
      '}') }
  else {
    throw new TypeError(
      'argument to stringify contains other than object, array, or ' +
      'string') } }

exports.parse = JSON.parse.bind(JSON)
