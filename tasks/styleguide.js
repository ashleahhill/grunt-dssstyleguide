/*
 * grunt-styleguide
 * http://ashleyhill.me
 *
 * Copyright (c) 2013 Ashley Hill
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore'); 

//https://github.com/gruntjs/grunt/wiki/Inside-Tasks
module.exports = function(grunt) {

	var dssParsers = require('./lib/dssParsers');


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
						//default additional parsers are in ./lib/dssParsers
						state: dssParsers.state,
						link: dssParsers.link
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
