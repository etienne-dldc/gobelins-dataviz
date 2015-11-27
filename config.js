'use strict';

var path = require('path');

var config = {
  index: 'src/index.html',
  outFileMin: 'build.min.js',
  outFile: 'build.js',
  out: 'dist/',
  publicPath: '',
  in: 'src/',
  entryPoint: './src/main.js',
  allIn: ['src/**/*'],
  allOut: ['dist/**/*'],
  assets: ['src/assets/**/*']
}

module.exports = config;
