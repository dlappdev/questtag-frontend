/**
 * Created by kawnayeen on 4/16/17.
 */
(function () {
    "use strict";
    const gulp = require('gulp');
    const browserify = require('browserify');
    const babelify = require('babelify');
    const source = require('vinyl-source-stream');
    const uglify = require('gulp-uglify');
    const buffer = require('vinyl-buffer');
    const mocha = require('gulp-mocha');
    const connect = require('gulp-connect');

    gulp.task('connect', () => connect.server({
        base: 'http://localhost',
        port: 9000,
        livereload: true
    }));

    gulp.task('js', () => {
        browserify('./js/src/app.starter.js')
            .transform(babelify.configure({presets: ["es2015"]}))
            .bundle().on('error',err=>console.error(err))
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('./js/build'))
            .pipe(connect.reload());
    });

    gulp.task('test', () => {
        return gulp.src('./js/src/**/**.js', {read: false})
            .pipe(mocha({reporter: 'spec'}));
    });

    gulp.task(
        'default',
        ['connect', 'js'],
        () => {
            gulp.watch('./js/src/**/**.js', ['js']);
        }
    );
}());