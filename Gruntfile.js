/*
 * grunt-styleguide
 * http://ashleyhill.me
 *
 * Copyright (c) 2013 Ashley Hill
 * Licensed under the MIT license.
 */

'use strict';

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
			tests: [
				'tmp*'
			]
		},

		// Configuration to be run (and then tested).
		styleguide: {
			dev: {
				options: {
					compass: {
						config: 'test/config.rb',
						sassDir: 'test/fixtures/template/assets/source',
						cssDir: 'test/fixtures/template/assets/css',
						force: true
					},
					dss: {
						options: {
							template: 'test/fixtures/template/'
						},
						files: {
							'tmp_dev/': ['test/fixtures/*.{css,scss,sass,less,styl}']
						}
					}
				}
			},
			dist: {
				options: {
					compass: {
						config: 'test/config.rb',
						sassDir: 'test/fixtures/template/assets/source',
						cssDir: 'test/fixtures/template/assets/css',
						outputStyle: 'compact',
						noLineComments: true,
						force: true
					},
					dss: {
						options: {
							template: 'test/fixtures/template/'
						},
						files: {
							'tmp_dist/': ['test/fixtures/*.{css,scss,sass,less,styl}']
						}
					}
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Clean tmp dirs, run plugin, test the result.
	grunt.registerTask('test', ['clean', 'styleguide', 'nodeunit']);

	grunt.registerTask('reset', ['jshint', 'clean']);
	
	// By default, lint and run all tests.
	// grunt.registerTask('default', ['clean', 'styleguide']);
	grunt.registerTask('default', ['jshint', 'test']);

};
