'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var config = {
    sass: {
        src: './sass/main.scss',
        watch: './sass/**/*.scss',
        dest: './css',
        destFile: 'style.min.css'
    },
    html: {
        watch: './*.html'
    }
}

gulp.task('sass', function() {
    return gulp.src(config.sass.src)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
			browsers: ['> 1%', 'last 2 versions'],
			cascade: false
		}))
        .pipe(rename(config.sass.destFile))
        .pipe(gulp.dest(config.sass.dest))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch([config.sass.watch], ['sass', reload]);
});

gulp.task('server', function() {
    return runSequence(
        'sass',
        'browser-sync',
        'watch'
    );
});
