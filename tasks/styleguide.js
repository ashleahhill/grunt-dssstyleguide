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

	var styleguide = require('./lib/styleguide').init(grunt);

	// Load the necessary tasks
	grunt.loadNpmTasks('grunt-dss');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Register styleguide task
	grunt.registerMultiTask('styleguide', 'Lazily Make a StyleGuide', function() {

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options(
			{
				testOption: 'three',
				compass: {
					config: 'config.rb',
				},
			}
		);
		
		grunt.log.ok('Generating Style Documentation: ' + this.target);
		grunt.verbose.writelns(options);

		var compassConfig = styleguide.getCompassConfig(options);
		var dssConfig = styleguide.getDssConfig(options);

		// http://integralist.co.uk/Using-Grunts-Config-API.html
		// Set the new configurations
		grunt.config.set('compass', compassConfig);
		grunt.config.set('dss', dssConfig);

		// Run the new targets
		grunt.task.run('compass:styleDocs');
		grunt.task.run('dss:styleDocs');

	});

};
