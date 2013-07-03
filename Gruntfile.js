/*
 * grunt-styleguide
 * 
 *
 * Copyright (c) 2013 Ashley Hill
 * Licensed under the GNU license.
 */

'use strict';

var dss = require('dss');

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp','tmp2','tmp3']
		},

		// Configuration to be run (and then tested).
		styleguide: {
			dev: {},
			dist: {
				options: {
					compass: {
						outputStyle:'compact',
						noLineComments:true,
						force:true
					},
					dss: {
						files: {
							'tmp3/':['test/fixtures/*.{css,scss,sass,less,styl}']
						}
					}
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'styleguide', 'nodeunit']);

	// By default, lint and run all tests.
	// grunt.registerTask('default', ['jshint', 'test']);

	grunt.registerTask('default', ['jshint', 'clean', 'styleguide']);

};
