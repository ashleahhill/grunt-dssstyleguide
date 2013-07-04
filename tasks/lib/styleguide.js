exports.init = function(grunt) {
	'use strict';
	
	var _ = require('underscore'); 
	var dssParsers = require('./dssParsers');

	var exports = {};

	// Utilities


	// Exports

	// Returns a grunt-contrib-compass options object
	exports.getCompassConfig = function(options) {
		var config = {
				options: {
				},
		};

		_.extend( config.options, options.compass );

		return config;
	};

	// Returns a grunt-dss options object
	exports.getDssConfig = function(options) {
		var config = {
				options: {
					template: 'template/',
					parsers: {
						state: dssParsers.state,
						link: dssParsers.link,
					}
				},
				files: {},
		};

		_.extend( config.options, options.dss );
		
		// Replace files
		if(Object.keys(options.dssFiles).length > 0){
			config.files = options.dssFiles;
		}

		return config;
	};
		
	return exports;
};
