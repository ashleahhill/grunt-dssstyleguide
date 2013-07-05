exports.init = function(grunt) {
	'use strict';
	
	var _ = require('underscore'); 
	var dssParsers = require('./dssParsers');

	var exports = {};

	// Utilities


	// Exports

	// Returns a grunt-contrib-compass options object
	exports.getCompassConfig = function(options) {
		var config = { options: {}, };

		_.extend(config.options, options.compass);

		// Base Compass Src and Target on dssTemplate
		if (!options.compassSourceTarget){
			config.options.sassDir = options.dssTemplate + 'assets/source';
			config.options.cssDir = options.dssTemplate + 'assets/css';
		}

		return config;
	};

	// Returns a grunt-dss options object
	exports.getDssConfig = function(options) {
		var config = {
			options: {
				template: options.dssTemplate,
				parsers: {
					state: dssParsers.state,
					link: dssParsers.link,
				}
			},
			files: {},
		};

		config.files[options.dssTarget] = options.dssFiles;

		_.extend( config.options.parsers, options.dssParsers );

		return config;
	};
		
	return exports;
};
