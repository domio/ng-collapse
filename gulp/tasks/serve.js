var gulp        = require('gulp'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync');

gulp.task('serve', function (cb) {
    runSequence('serve:init', 'watch', cb);
});

gulp.task('serve:init', function () {
    browserSync({
        notify: false,
        server: {
            baseDir: ['dist']
        }
    });
});
