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
			styleDocs: {
				options: {
				},
			},
		};
		
		_.extend( config.styleDocs.options, options.compass );

		return config;
	};

	// Returns a grunt-dss options object
	exports.getDssConfig = function(options) {
		var config = {
			styleDocs: {
				options: {
					template: 'template/',
					parsers: {
						state: dssParsers.state,
						link: dssParsers.link,
					}
				},
				files: {}
			}
		};

		_.extend( config.styleDocs.options, options.dss );
		
		// Replace files
		if(Object.keys(options.dssFiles).length > 0){
			config.styleDocs.files = options.dssFiles;
		}

		return config;
	};
		
	return exports;
};