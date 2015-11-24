'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("../../webpack.config.js");
var WebpackDevServer = require("webpack-dev-server");

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: "/" + myConfig.output.publicPath,
		stats: {
			colors: true
		},
		hot: true,
		inline: true,
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/");
	});
});
