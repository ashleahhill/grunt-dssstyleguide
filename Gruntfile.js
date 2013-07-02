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
			tests: ['tmp','tmp2'],
		},

		// dss config
		dss: {
			docs: {
				options: {
					template: 'test/fixtures/template/',
					parsers: {
						// Describe parsing a state
						state: function(i, line, block){
							var state = line.split(' - ');
							return {
								name: (state[0]) ? dss.trim(state[0]) : '',
								escaped: (state[0]) ? dss.trim(state[0].replace('.', ' ').replace(':', ' is-')) : '',
								description: (state[1]) ? dss.trim(state[1]) : ''
							};
						},
						// Finds @link in comment blocks
						link: function(i, line, block){
							// Replace link with HTML wrapped version
							var exp = /(b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
							line.replace(exp, "<a href='$1'>$1</a>");
							return line;
						}
					}
				},
				files: {
					'tmp2/':['test/fixtures/*.{css,scss,sass,less,styl}']
				}
			}
		},

		// compass config
		compass: {
			options: {
				//config is relative to this file, not config file
				config: 'test/config.rb'
			},
			dss:{
				options:{
					sassDir: 'test/fixtures/template/assets/source',
					cssDir:  'test/fixtures/template/assets/css'
				}
			},
			test:{}
		},

		// Configuration to be run (and then tested).
		styleguide: {
			default_options: {
				options: {
				},
				files: {
					'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
				},
			},
			custom_options: {
				options: {
					separator: ': ',
					punctuation: ' !!!',
				},
				files: {
					'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
				},
			},
		},

		// Configuration to be run (and then tested).
		styleguide_template: {
			default_options: {
				options: {
				},
				files: {
					'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
				},
			},
			custom_options: {
				options: {
					separator: ': ',
					punctuation: ' !!!',
				},
				files: {
					'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
				},
			},
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-dss');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'styleguide', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
