#!/usr/bin/env node --harmony
'use strict';

var Bunyan = require('bunyan');
var Pretty = require('bunyan-pretty-stream');
var Program = require('commander');
var fs = require('fs-extra-promise');
var Walk = require('walk');
var pack = require('./package.json');

var log = Bunyan.createLogger({
	name: 'organize-images',
	level: 'error',
	stream: new Pretty()
});

var options = {
	followLinks: false
};

Program
  .version(pack.version)
  .option('-S, --source <path>', 'source directory of the files')
  .option('-D, --destination <path>',
		'destination directory of the organized files')
  .option('-v, --verbose', 'verbose mode')
  .parse(process.argv);

log.level((Program.verbose) ? 20 : log.level());

if (typeof Program.source === 'undefined' ||
	typeof Program.destination === 'undefined') {
	log.error('Source or Destination is not defined');
	process.exit(1);
}

Program.destination = Program.destination.replace(/\/?$/, '/');
var walker = Walk.walk(Program.source, options);
walker.on("file", function(root, stat, next) {
	var sourcePath = root + '/' + stat.name;
	var targetPath = Program.destination +
		stat.birthtime.getFullYear() +
		stat.birthtime.getMonth() +
		stat.birthtime.getDate() +
		'/' +
		stat.name;
	fs.copyAsync(sourcePath, targetPath).then(function() {
	}).catch(function(error) {
		log.error(error);
	});
	next();
});

walker.on("errors", function(root, stat, next) {
	log.error(stat);
	next();
});

walker.on("end", function() {
	log.info("all done");
});
