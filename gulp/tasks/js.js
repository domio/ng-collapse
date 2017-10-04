var concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    gulp        = require('gulp'),
    config      = require('../config'),
    watch       = require('gulp-watch');

gulp.task('watch:js', function () {
    watch([
            './src/modules/**/*.js'
        ], {
            usePolling: true,
            alwaysStat: true
        },
        function () {
            gulp.start('js');
        });
});

gulp.task('js:app', function (cb) {
    var pipeline;
    pipeline = gulp.src(['./src/modules/app/**/*.js'])
    pipeline.pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .on('end', cb);
});

gulp.task('js:plugin', function (cb) {
    var pipeline;
    pipeline = gulp.src(['./src/modules/' + config.name + '/**/*.js']);

    if (!config.dev) {
        pipeline = pipeline.pipe(uglify({
            compress: {
                drop_console: true
            }
        })).on('error', function (error) {
            if (!config.dev) {
                console.error(error);
                throw error;
            }
            console.error(error);
            cb();
        });
    }
    pipeline.pipe(concat(config.name + '.min.js'))
        .pipe(gulp.dest('dist/' + config.name + '/js'))
        .on('end', cb);
});

gulp.task('js:libraries', function (cb) {
    gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-sanitize/angular-sanitize.min.js',
        'node_modules/velocity-animate/velocity.min.js',
        'node_modules/lodash/index.js'])
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('dist/js'))
        .on('end', cb);
});
