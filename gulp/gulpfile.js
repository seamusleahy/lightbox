'use strict';

var gulp = require('gulp');

gulp.task('JS:lint', function() {
    return require('./tasks/js/lint')();
});

gulp.task('JS:watch', function() {
    return require('./tasks/js/watch')();
});

gulp.task('CSS:clean', function(done) {
    return require('./tasks/css/clean')(done);
});

gulp.task('CSS:development', function() {
    return require('./tasks/css/development')();
});

gulp.task('CSS:production', ['CSS:clean', 'CSS:development'], function() {
    return require('./tasks/css/production')();
});

gulp.task('CSS:watch', ['CSS:development'], function() {
  gulp.watch(['../css/src/*.scss', '../css/src/**/*.scss'], ['CSS:development']);
});

gulp.task('watch', ['CSS:watch']);

gulp.task('clean', [
    'CSS:clean'
]);

gulp.task('development', [
    'JS:lint',
    'CSS:development'
]);
