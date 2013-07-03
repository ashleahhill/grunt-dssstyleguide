/*
 * grunt-styleguide
 * 
 *
 * Copyright (c) 2013 Ashley Hill
 * Licensed under the MIT license.
 */

'use strict';

var dss = require('dss'); // required here for custom parsers
var _ = require('underscore'); 

module.exports = function(grunt) {

	//https://github.com/gruntjs/grunt/wiki/Inside-Tasks

	grunt.loadNpmTasks('grunt-dss');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerMultiTask('styleguide', 'Lazily Make a StyleGuide', function(requested) {

		var compassStyleDocs = {
			styleDocs: {
				options: {
					config:  'test/config.rb',
					sassDir: 'test/fixtures/template/assets/source',
					cssDir:  'test/fixtures/template/assets/css'
				}
			}
		};

		var dssStyleDocs = {
			styleDocs: {
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
		};

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			compass: {},
			dss: {
				options: {},
				files: {}
			}
		});
		
		// console.log(this.target);
		
		// Extend the task options
		_.extend( compassStyleDocs.styleDocs.options, options.compass );
		_.extend( dssStyleDocs.styleDocs.options, options.dss.options );

		// Replace files
		if(Object.keys(options.dss.files).length > 0){
			dssStyleDocs.styleDocs.files = options.dss.files;
		}

		// http://integralist.co.uk/Using-Grunts-Config-API.html
		// Set the new configurations
		grunt.config.set('compass',compassStyleDocs);
		grunt.config.set('dss',dssStyleDocs);

		// run the new tasks
		grunt.task.run('compass:styleDocs');
		grunt.task.run('dss:styleDocs');

	});

};
