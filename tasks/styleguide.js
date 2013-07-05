/*
 * grunt-styleguide
 * http://ashleyhill.me
 *
 * Copyright (c) 2013 Ashley Hill
 * Licensed under the MIT license.
 */

'use strict';


//https://github.com/gruntjs/grunt/wiki/Inside-Tasks
module.exports = function(grunt) {

	var _ = require('underscore');
	var styleguide = require('./lib/styleguide').init(grunt);

	// Load the necessary tasks
	grunt.loadNpmTasks('grunt-dss');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Register styleguide task
	grunt.registerMultiTask('styleguide', 'Lazily Make a StyleGuide', function() {

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options(
			{
				taskTarget: 'styledocs',
				compassSourceTarget: false, 
				compass: { config: 'config.rb'},
				dssTemplate: 'dssTemplate/',
				dssTarget: 'styledocs/',
				dssFiles: [],
				dssParsers: {}
			}
		);

		// Require that dss template, target, & files be set


		grunt.verbose.writeflags(options, 'Options');
		grunt.log.write('Generating style documentation: "' + this.target + '"...');

		var compassConfig = styleguide.getCompassConfig(options);
		var dssConfig = styleguide.getDssConfig(options);

		// http://integralist.co.uk/Using-Grunts-Config-API.html
		// Set the new configurations
		function extendOrCreateTask(taskName, config){
			var wrapper = {};
			var currentConfig = grunt.config.get(taskName);
			
			taskName.toString();
			
			grunt.verbose.write('Creating task ' + taskName + ':' + options.taskTarget + '...');
			
			wrapper[options.taskTarget] = config;
			
			if(!!currentConfig){
				// There is already a taskName task
				wrapper = _.extend({},currentConfig, wrapper);
			}
			grunt.verbose.ok();

			grunt.config.set(taskName, wrapper);
			grunt.task.run(taskName + ':' + options.taskTarget);
			
			grunt.verbose.oklns('Task ' + taskName + ':' + options.taskTarget + ' triggered.');
		}

		extendOrCreateTask('compass', compassConfig);
		extendOrCreateTask('dss', dssConfig);

		grunt.log.ok();

	});

};
