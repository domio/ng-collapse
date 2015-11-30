(function () {
    'use strict';
    var through  = require('through2'),
        lodash   = require('lodash'),
        gutil    = require('gulp-util'),
        nunjucks = require('nunjucks');
    nunjucks.configure({watch: false});
    module.exports = function (env, options) {
        var data = lodash.cloneDeep(options);
        return through.obj(
            function (file, enc, cb) {
                if (file.isNull()) {
                    return cb(null, file);
                }

                if (file.data) {
                    data = lodash.merge(file.data, data);
                }

                if (file.isStream()) {
                    this.emit('error', new gutil.PluginError('gulp-nunjucks', 'Streaming not supported'));
                    return cb();
                }
                env.renderString(file.contents.toString(), data, function (err, result) {
                    if (err) {
                        this.emit('error', new gutil.PluginError('gulp-nunjucks', err.message));
                        return cb();
                    }
                    file.contents = new Buffer(result);
                    cb(null, file);
                }.bind(this));
            }
        );
    };
}());
