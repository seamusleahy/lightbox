var gulp = require('gulp');
var jshint = require('gulp-jshint');
var map = require('map-stream');


module.exports = function(watchForChanges) {
    return gulp.src('./../js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(jshint.reporter('fail'));

};
