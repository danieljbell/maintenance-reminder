var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    postcss       = require('gulp-postcss'),
    sourcemaps    = require('gulp-sourcemaps'),
    atImport      = require('postcss-import'),
    autoprefixer  = require('autoprefixer'),
    mqpacker      = require('css-mqpacker'),
    cssnano       = require('cssnano'),
    pump          = require('pump'),
    browserSync   = require('browser-sync'),
    clean         = require('gulp-clean'),
    nodemon       = require('gulp-nodemon'),
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload;

gulp.task('css', function () {
  var processors = [
    atImport,
    autoprefixer({browsers: ['last 6 versions', 'ie 9', 'ie 10', 'ie 11']}),
    mqpacker,
    cssnano
  ];
  gulp.src('./public/stylesheets/**/*', {read: false})
    .pipe(clean());
  gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.stream());
});

gulp.task('img', function() {
  gulp.src('./public/images/**/*', {read: false})
    .pipe(clean());
  gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./public/images'))
});

gulp.task('js', function() {
  gulp.src('./public/scripts/**/*', {read: false})
    .pipe(clean());
  gulp.src('./src/js/**/*')
    .pipe(gulp.dest('./public/scripts'))
    .pipe(browserSync.stream());    
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "localhost:1337",
    port: 3000
  });
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch(['src/img/**/*.jpg', 'src/img/**/*.png', 'src/img/**/*.svg'], ['img']);
});

gulp.task('default', ['css', 'js', 'img', 'browser-sync']);