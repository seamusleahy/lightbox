var gulp = require('gulp');
var filter = require('gulp-filter');
var cache = require('gulp-cached');
var progeny = require('gulp-progeny');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function() {
    var sassBuilder = sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
    });

    sassBuilder.on('error', function(e) {
        console.log(e.toString());
        this.emit('end');
    });

    var autoprefixerBuilder = autoprefixer({
        browsers: ['> 0.5% in US'], // Same as default for caniuse.com
        cascade: false
    });

    autoprefixerBuilder.on('error', function(e) {
        console.log(e.toString());
        this.emit('end');
    });

    var sassFilter = filter([
        '**/*.scss', '!**/imports/**/*.scss', '!**/_**/*.scss', '!**/**/_*.scss'
    ]);

    var sassStream = gulp.src(['../css/src/*.scss', '../css/src/**/*.scss'])
        .pipe(cache('sass'))
        .pipe(progeny({
            extensionsList: ['scss', 'sass'],
            regexp: /^\s*@import\s+['']?([^'']+)['']?[;]?/
        }))
        .pipe(sourcemaps.init())
        .pipe(sassFilter)
        .pipe(sassBuilder)
        .pipe(autoprefixerBuilder)
        .pipe(sourcemaps.write({
            sourceRoot: '/css/src'
        }))
        .pipe(gulp.dest('../css/dist'));

    return sassStream;
};
