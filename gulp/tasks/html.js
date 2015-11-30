var nunjucks = require('nunjucks'),
    _        = require('lodash'),
    gnunj    = require('../gulp-nunjucks'),
    gulp     = require('gulp'),
    config   = require('../config'),
    htmlmin  = require('gulp-htmlmin'),
    watch    = require('gulp-watch');

gulp.task('watch:html', function () {
    watch('src/modules/app/**/*.html', {usePolling: true, alwaysStat: true}, function () {
        gulp.start('html');
    });
    watch('src/modules/' + config.name + '/**/[^_]*.html', {usePolling: true, alwaysStat: true}, function () {
        gulp.start('html:plugin');
    });
    watch('src/index.html', {usePolling: true, alwaysStat: true}, function () {
        gulp.start('html:index');
    });
});

gulp.task('html:app', function () {
    var env = new nunjucks.configure('./src/modules', {watch: false});
    return gulp.src('src/modules/app/**/[^_]*.html')
        .pipe(gnunj(env, config))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/html'));
});
gulp.task('html:plugin', function () {
    var env = new nunjucks.configure('./src/modules', {watch: false});
    return gulp.src('src/modules/' + config.name + '/**/[^_]*.html')
        .pipe(gnunj(env))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/' + config.name ));
});
gulp.task('html:index', function (cb) {
    var env = new nunjucks.Environment();
    gulp.src('src/index.html')
        .pipe(gnunj(env, config))
        .pipe(gulp.dest('./dist'))
        .on('end', cb);

});
