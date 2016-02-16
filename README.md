# ncmd

This is a simple implementation of file management. The the current command will recursively search files from a source directory and copy the file to a destination directory organized by folders based on date created field.

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]
[![Test coverage][coveralls-image]][coveralls-url]

[travis-image]: https://travis-ci.org/cli-utilities/ncmd.svg?branch=master
[travis-url]: https://travis-ci.org/cli-utilities/ncmd
[npm-image]: https://img.shields.io/npm/l/ncmd.svg
[npm-url]: https://www.npmjs.com/package/ncmd
[downloads-image]: https://img.shields.io/npm/dt/ncmd.svg
[downloads-url]: https://www.npmjs.com/package/ncmd
[coveralls-image]: https://img.shields.io/coveralls/cli-utilities/ncmd.svg
[coveralls-url]: https://coveralls.io/github/cli-utilities/ncmd

## Installation

    $ npm install ncmd
    
    #if the script does not create a symlink due to permissions
    $ npm link

## Usage
  
  Usage: index [options]

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -S, --source <path>       source directory of the images
    -D, --destination <path>  destination directory of the organized images
    -v, --verbose             verbose mode

## License

  Apache-2.0
