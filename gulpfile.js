'use strict';

var gulp = require('gulp');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var stream = require('webpack-stream');
var wiredep = require('wiredep').stream;

// Get Config
var config = require('./config.js');

// Load plugins
var $ = require('gulp-load-plugins')();


gulp.task('webpack', [], function() {
  return gulp.src(config.allIn)
  .pipe($.sourcemaps.init())
  .pipe(stream(webpackConfig))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(config.out));
});

gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    //publicPath: "/",
    contentBase: config.out,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if (err) throw new $.util.PluginError("webpack-dev-server", err);
    $.util.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});

gulp.task('clean', function () {
  return gulp.src(config.allOut, { read: false }).pipe($.clean());
});

gulp.task('html', function () {
  return gulp.src(config.index)
    .pipe($.useref())
    .pipe(gulp.dest(config.out));
});


gulp.task('assets', function () {
  return gulp.src(config.assets)
    .pipe(gulp.dest(config.out));
});


gulp.task('watch', function() {
  gulp.watch(config.all, ['build']);
});

gulp.task('build', ['html', 'assets', 'webpack']);

gulp.task('default', ['clean'], function () {
  gulp.start(['webpack-dev-server', 'watch', 'build']);
});
