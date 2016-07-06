var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify');

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

gulp.task('scripts', function() {
	// Single entry point to browserify 
	gulp.src('public/js/loader.js')
		.pipe(browserify({
		  insertGlobals : true,
		  debug : !gulp.env.production
		}))
		.pipe(gulp.dest('public/js/main.js'))
});

gulp.task('default', () =>
    gulp.src('public/lib/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'))
);