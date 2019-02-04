// ---------------
// General plugins
// ---------------
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');

// ------------
// Sass plugins
// ------------
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefix = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');

// ----------------------------
// Javascript plugins
// ----------------------------
var uglify = require('gulp-uglify');

// ------
// Config
// ------
var basePath = {
  src: './app/src/',
  assets: './app/assets/',
};

var path = {
  styles: {
    src: basePath.src + 'scss/',
    assets: basePath.assets + 'css/'
  },
  scripts: {
    src: basePath.src + 'js/',
    assets: basePath.assets + 'js/'
  },
}

function compileSASS() {
  return gulp.src(path.styles.src + '**/*.scss')
  .pipe(sassGlob())
  .pipe(sass())
  .pipe(autoprefix({
    browsers: ['last 2 versions']
  }))
  .pipe(cleanCss())
  .pipe(gulp.dest(path.styles.assets))
}


function copyScripts() {
  return gulp.src(path.scripts.src + '**/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.scripts.assets));
}

function runWatch() {
  gulp.watch(path.styles.src + '**/*.scss', compileSASS);
  gulp.watch(path.scripts.src + '**/*.js', copyScripts);
}

// -----------
// Watch task.
// -----------
gulp.task('watch', gulp.series(runWatch));

gulp.task('sass', gulp.series(compileSASS));
gulp.task('scripts', gulp.series(copyScripts));