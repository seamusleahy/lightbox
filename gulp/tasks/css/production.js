var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');

module.exports = function() {
    var stream = gulp.src(['../css/dist/**/*.css'])
        .pipe(minifyCss({
            compatibility: 'ie11'
        }))
        .on('error', function(e) {
            console.error(e.toString());
            stream.end();
        })
        .pipe(gulp.dest('../css/dist'));

    return stream;
};
