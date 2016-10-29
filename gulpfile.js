"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var cssnano = require('gulp-cssnano');


var sassDir = {
    "src": 'src/sass/**/*.scss',
    "dest": 'build/'
};
var cssDir = {
    "src": 'src/css/**/*.css',
    "dest": 'build/'
};



gulp.task('clean', function(){
    return del([
        'build/style.css',
        'build/vendor.css'
    ]);
});

gulp.task('sass', ['clean'], function () {
    return gulp.src(sassDir.src)
        .pipe(concat('style.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'ie 9', 'ios 6', 'android 4'))
        .pipe(gulp.dest(sassDir.dest))
});

gulp.task('sass:prod', ['clean'], function () {
    return gulp.src(sassDir.src)
        .pipe(concat('style.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'ie 9', 'ios 6', 'android 4'))
        .pipe(cssnano())
        .pipe(gulp.dest(sassDir.dest))
});

gulp.task('vendorCss', function () {
    return gulp.src(cssDir.src)
        .pipe(concat('vendor.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(sassDir.dest))
});

gulp.task('watch', function() {
    gulp.watch(sassDir.src, ['sass','vendorCss']);
    gulp.watch(cssDir.src, ['sass','vendorCss']);
});


gulp.task('default', ['vendorCss', 'sass:prod']);
gulp.task('dev', ['vendorCss','sass', 'watch']);

