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

program
  .version('0.0.1')
  .option('-S, --source <path>', 'source directory of the images')
  .option('-D, --destination <path>', 'destination directory of the organized images')
  .option('-v, --verbose', 'verbose mode')
  .parse(process.argv);

log.level((program.verbose)?20:log.level());

if (typeof program.source === 'undefined' || typeof program.destination === 'undefined') {
	log.error('Source or Destination is not defined');
	process.exit(1);
}

var walker = walk.walk(program.source);

walker.on("files", function (root, fileStats, next) {
	log.info(fileStats);
});

walker.on("errors", function (root, nodeStatsArray, next) {
	log.error(nodeStatsArray);
	next();
});

walker.on("end", function () {
	log.info("all done");
});






