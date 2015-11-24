'use strict';
var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var webpack = require('webpack');
var webpackGulp = require('gulp-webpack');
var packageJSON = require('../package.json');
var reload = require('browser-sync').reload;
var BowerWebpackPlugin = require('bower-webpack-plugin');

gulp.task('webpack', function() {

	var debug = true;
	var devtool = '#source-map';
	var plugins = [];

	if (process.env.NODE_ENV === config.PRODUCTION) {
		debug = false;
		devtool = '';
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({sourceMap:false, compress: {warnings: false}}),
			new webpack.BannerPlugin(
				packageJSON.name + ' - v' + packageJSON.version + '\n' +
				packageJSON.description + '\n' +
				packageJSON.author.name + ' - ' + packageJSON.author.email + ' - ' + packageJSON.author.url + '\n' +
				'Copyright (c) ' + new Date().getFullYear() + '\n' +
				'Licensed ' + packageJSON.license + '\n' +
				'Build : ' + new Date().toDateString()
			)
		);
	}

	plugins.push(
		new webpack.ProvidePlugin({
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.DefinePlugin({
			__DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.NODE_ENV === config.DEVELOPMENT)),
			__PRODUCTION__: JSON.stringify(JSON.parse(process.env.NODE_ENV === config.PRODUCTION))
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js',
			minChunks: function(module) {
				return module.resource && (module.resource.indexOf(path.resolve(__dirname, config.path.src)) === -1);
			}
		}),
		new BowerWebpackPlugin({
			modulesDirectories: ['bower_components'],
			manifestFiles: 'bower.json',
			includes: /.*/,
			excludes: [],
			searchResolveModulesDirectories: true
		})
	);

	return gulp.src(config.path.webpack.src)
		.pipe(webpackGulp({
			entry: {
				bundle: config.path.webpack.src
			},
			devtool: devtool,
			debug: debug,
			module: {
				preLoaders:[],
				loaders: [
					{ test: /\.html$/, loader: 'html' },
					{ test: /\.json$/, loader: 'json' },
					{ test: /\.js$/, exclude: /(node_modules|bower_components|src\/scripts\/vendors)/, loader: 'babel-loader'},
					{ test: /preloadjs-0\.6\.1\.combined\.js$/, loader: 'imports?this=>window!exports?createjs.LoadQueue' },
					{ test: /splitText\.js$/, loader: 'imports?define=>false!exports?SplitText' }
				],
				postLoaders:[]
			},

			glsl: {
				chunkPath: 'chunks'
			},

			output: {
				path: config.path.webpack.output.path,
				filename: '[name].js',
				publicPath: config.path.webpack.output.publicPath
			},

			resolve: {
				modulesDirectories: ['node_modules'],
				root: config.path.webpack.root
			},

			externals: {
				TweenMax: 'TweenMax',
				TimelineMax: 'TimelineMax'
			},

			plugins: plugins

		}, null, function(err, stats) {

			if (stats.compilation.errors.length) {

				console.log(stats.compilation.errors[0].toString());
			}

			if (err) {

				console.log(err.toString());
			}

			reload();

		}))
		.pipe(gulp.dest(config.path.webpack.dest));

});
