/*
 * dssParsers
 * 
 * additional and customized parsers for [DSS](https://github.com/darcyclarke/DSS)
 *
 * @author Ashley Hill unless otherwise noted noted
 */

var dssParsers = (function(){
	'use strict';
	
	// Dependencies
	var dss = require('dss');

	var _dssParsers = function(){};

	// Finds @link in comment blocks
	// @author Darcy Clarke
	// @link https://github.com/darcyclarke/grunt-dss example
	_dssParsers.link = function(i, line, block, file){
		return line;
		// Replace link with HTML wrapped version
		var exp = /(b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		line.replace(exp, "<a href='$1'>$1</a>");
	};

	// Describe parsing a state
	// this one uses classes I prefer for code.
	_dssParsers.state = function(i, line, block, file){
		var state = line.split(' - ');
		return {
			name: (state[0]) ? dss.trim(state[0]) : '',
			escaped: (state[0]) ? dss.trim(state[0].replace('.', ' ').replace(':', ' is-')) : '',
			description: (state[1]) ? dss.trim(state[1]) : ''
		};
	};

	// Return function
	return _dssParsers;

})();

//export
module.exports = dssParsers;
