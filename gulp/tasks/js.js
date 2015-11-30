var nunjucks    = require('nunjucks'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jscs        = require('gulp-jscs'),
    gnunj       = require('../gulp-nunjucks'),
    gulp        = require('gulp'),
    runSequence = require('run-sequence'),
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
        .pipe(jscs({
            esprima: './node_modules/esprima-fb',
            esnext: true,
            verbose: true,
            disallowMultipleVarDecl: null,
            requireMultipleVarDecl: true,
            requireSpacesInAnonymousFunctionExpression: false,
            preset: 'yandex'
        }));
    pipeline.pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .on('end', cb);
});

gulp.task('js:plugin', function (cb) {
    var pipeline;
    pipeline = gulp.src(['./src/modules/' + config.name + '/**/*.js'])
        .pipe(jscs({
            esprima: './node_modules/esprima-fb',
            esnext: true,
            verbose: true,
            disallowMultipleVarDecl: null,
            requireMultipleVarDecl: true,
            requireSpacesInAnonymousFunctionExpression: false,
            preset: 'yandex'
        })).on('error', function (error) {
            if (!config.dev) {
                throw error;
            }
            console.error(error);
            cb();
        });

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
        'bower_components/angular/angular.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/velocity/velocity.min.js',
        'bower_components/lodash/lodash.min.js'])
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('dist/js'))
        .on('end', cb);
});
