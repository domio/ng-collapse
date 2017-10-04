var sass        = require('gulp-sass'),
    gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    runSequence = require('run-sequence'),
    config      = require('../config'),
    watch       = require('gulp-watch');

gulp.task('watch:styles', function () {
    watch(['src/**/*.scss'], {usePolling: true, alwaysStat: true}, function () {
        gulp.start('styles');
    });
});

gulp.task('styles:app', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass.sync({
            includePaths: [
                'node_modules'
            ],
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('styles:plugin', function () {
    return gulp.src('src/modules/' + config.name + '/**/*.scss')
        .pipe(sass.sync({
            includePaths: [
                'bower_components'
            ],
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/' + config.name + '/css'));
});
