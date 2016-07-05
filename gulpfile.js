var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat');

gulp.task('browser', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('concatCss', function () {
    return gulp.src('./public/css/*.css')
        .pipe(concat('main.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/css'));
});
