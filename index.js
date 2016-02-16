#!/usr/bin/env node --harmony
'use strict';

var promise = require("bluebird");
var bunyan = require('bunyan');
var pretty = require('bunyan-pretty-stream');
var program = require('commander');
var fs = require('fs-extra-promise');
var walk = require('walk');

var log = bunyan.createLogger({
	name: 'organize-images',
	level: 'error',
	stream: new pretty()
});

var options = {
	followLinks: false
}

program
  .version('0.0.3')
  .option('-S, --source <path>', 'source directory of the images')
  .option('-D, --destination <path>', 'destination directory of the organized images')
  .option('-v, --verbose', 'verbose mode')
  .parse(process.argv);

log.level((program.verbose)?20:log.level());

if (typeof program.source === 'undefined' || typeof program.destination === 'undefined') {
	log.error('Source or Destination is not defined');
	process.exit(1);
}

program.destination = program.destination.replace(/\/?$/, '/');

var walker = walk.walk(program.source, options);
walker.on("file", function (root, stat, next) {
	
	var sourcePath = root + '/' + stat.name;
	
	var targetPath = program.destination 
		+ stat.birthtime.getFullYear()
		+ stat.birthtime.getMonth()
		+ stat.birthtime.getDate()
		+ '/'
		+ stat.name;

	fs.copyAsync(sourcePath, targetPath).then(function(){
		//TODO: Implement progress bar
	}).catch(function(error){
		log.error(error);
	})

	next();
});

walker.on("errors", function (root, stat, next) {
	log.error(stat);
	next();
});

walker.on("end", function () {
	log.info("all done");
});






