'use strict';

var gulp        = require( 'gulp' );
var runSequence = require( 'run-sequence' );
var requireDir  = require( 'require-dir' );
// Require all tasks.
requireDir( './gulp/tasks', { recurse: true } );
// Commonly used tasks defined here.
gulp.task( 'default', function(  )
{
   runSequence(
      'browser-sync',
      'watch'
   );
} );

gulp.task( 'build', function()
{
   runSequence(
      'webpack:build'
   );
} );
