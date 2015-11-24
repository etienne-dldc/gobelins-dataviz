'use strict';

var path = require('path');
var base = path.join(__dirname, '/..');
var src = base + '/src';
var dest = base + '/dist';

module.exports = {
	DEVELOPMENT: 'development',
	PRODUCTION: 'production',
	browserSync: {
		proxy: 'localhost:8191',
		port: 3000
	},
	path: {
		base: base,
		src: src,
		dest: dest,
		clean: {
			src: [
				dest
			]
		},
		copy: {
			src: [
				src + '/fonts/**',
				src + '/data/**',
				src + '/sounds/**',
				src + '/models/**',
				src + '/glsl/fragment-shaders/**',
				src + '/glsl/vertex-shaders/**',
				src + '/*.txt'
			],
			dest: dest
		},
		styles: {
			src: src + '/styles',
			dest: dest + '/styles'
		},
		images: {
			src: [
				src + '/images/**'
			],
			dest: dest + '/images'
		},
		lint: {
			src: [
				'gulpfile.js',
				'gulp-tasks/*.js',
				src + '/scripts/**/*.js',
				'!' + src + '/scripts/vendors/**/*.js'
			]
		},
		webpack: {
			src: [
				src + '/main.js'
			],
			dest: dest + '/',
			output: {
				path: src + '/',
				publicPath: '/'
			},
			root:[
				src + '/scripts/**/*.js',
				src + '/glsl'
			]
		},
		watch: {
			styles: src + '/styles/**/*.scss',
			scripts: src + '/scripts/**/*.js',
			json: src + '/data/**/*.{json,js}',
			template: src + '/scripts/**/*.html',
			glsl: src + '/glsl/**/*glsl'
		}
	}
};
