'use strict';

var gulp = require("gulp");
var gutil = require("gulp-util");
var browserSync = require('browser-sync').create();

gulp.task("watch", ["webpack:build-dev"], function() {
	gulp.watch(["src/**/*"], ["webpack:build-dev"]);
});
