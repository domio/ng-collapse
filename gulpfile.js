(function () {
    var gulp = require('gulp'),
        config      = require('./gulp/config'),
        runSequence = require('run-sequence');
    gulp.task('build', ['styles', 'html', 'js']);
    gulp.task('watch', function (cb) {
        config.dev = true;
        runSequence(['watch:styles', 'watch:js', 'watch:html'], cb);
    });
    gulp.task('js', function (cb) {
        runSequence('clean:js', ['js:app', 'js:plugin', 'js:libraries'], cb);
    });
    gulp.task('styles', function (cb) {
        runSequence('clean:styles', ['styles:app', 'styles:plugin'], cb);
    });
    gulp.task('html', function (cb) {
        runSequence('clean:html', ['html:app', 'html:plugin', 'html:index'], cb);
    });
    require('./gulp');
}());
