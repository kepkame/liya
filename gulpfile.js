'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src([
      './src/sass/main.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['> 0.1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

const jsFiles = [
  './src/js/jquery.min.js',
	'./src/js/slick.min.js',
  './src/js/menu.js',
  './src/js/minicart.js',
  './src/js/slider-hvr.js',
	'./src/js/scripts.js'
];

function scripts() {
	return gulp.src(jsFiles)
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(concat('common.js'))
		.pipe(uglify({
		  toplevel: true
		}))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

gulp.task('copy', function() {
	return gulp.src([
		'./src/fonts/**/*.{eot,ttf,woff,woff2}',
    './src/img/**/*.{jpg,jpeg,png,svg,gif}'
	], {
		base: './src'
	})
    .pipe(gulp.dest('./build'));
});

function watch() {
	gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./src/img/**/*.{png,jpg,jpeg,svg}', gulp.series('copy'));
}

function clean() {
	return del('./build/*');
}

gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean,
  gulp.parallel('sass', 'scripts', 'copy')
));

gulp.task('dev', gulp.series('build', 'watch'));
