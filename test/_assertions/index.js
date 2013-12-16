/**
 * Module dependencies
 */
var _ = require('lodash');
var assert = require('assert');



/**
 * `expect`
 */
function expect () {}


/**
 * expect.exists()
 * 
 * Ensure that the specified variable exists (is not undefined)
 * in the test context.
 * (i.e. `expect.exists("foo")` checks `this.foo`)
 *
 * @return {Function}
 */
expect.exists = function (keypath) {
	return function () {
		assert( typeof _deepValue(this, keypath) !== 'undefined' );
	};
};



/**
 * expect.noError()
 * 
 * Ensure that no error exists.
 */
expect.noError = function () {
	return function (err) {
		assert(!err);
	};
};




module.exports = expect;



/**
 * Dereference a "deep value" from an object, using a key like 'foo.bar.baz'
 * 
 * @param  {[type]} object	[the object to dereference]
 * @param  {String} path	[key, or 'key.subkey.subsubkey...']
 * 
 * @return {*}				[if the key(s) don't exist, return undefined, otherwise the value]
 */
function _deepValue (object, path) {
	if ('undefined' === typeof object || object === null) {
		return undefined;
	}
	var val = object;
	path = path.split('.');
	while (path.length) {
		var part = path.shift();
		if ('undefined' == typeof val[part]) {
			return undefined;
		} else {
			val = val[part];
		}
	}
	return val;
}