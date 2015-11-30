var vinylPaths  = require('vinyl-paths'),
    del         = require('del'),
    gulp        = require('gulp');

gulp.task('clean:js', function () {
    return gulp.src([
        'dist/[^tinymce]**/*.js'
    ], {read: false})
        .pipe(vinylPaths(del));
});

gulp.task('clean:styles', function () {
    return gulp.src([
        'dist/[^tinymce]**/*.css'
    ], {read: false})
        .pipe(vinylPaths(del));
});

gulp.task('clean:html', function () {
    return gulp.src([
        'dist/[^tinymce]**/*.html'
    ], {read: false})
        .pipe(vinylPaths(del));
});

gulp.task('clean', function () {
    return gulp.start([
        'clean:js',
        'clean:styles',
        'clean:html'
    ]);
});
