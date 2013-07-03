'use strict';

var grunt = require('grunt');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports.styleguide = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	dev: function(test) {
		test.expect(1);

		var actual = grunt.file.read('tmp_dev/assets/css/styles.css');
		var expected = grunt.file.read('test/expected/dev_styles.css');
		test.equal(actual, expected, 'should match the dev custom config style');

		test.done();
	},
	dist: function(test) {
		test.expect(1);

		var actual = grunt.file.read('tmp_dist/assets/css/styles.css');
		var expected = grunt.file.read('test/expected/dist_styles.css');
		test.equal(actual, expected, 'should match the dist custom config styles');

		test.done();
	},
	dss: function(test) {
		test.expect(1);

		var actual = grunt.file.read('tmp_dev/index.html');
		var expected = grunt.file.read('test/expected/default_index.html');
		test.equal(actual, expected, 'DSS template output should match.');

		test.done();
	},
};
