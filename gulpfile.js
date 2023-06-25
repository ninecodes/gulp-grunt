import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

function img() {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

function scss() {
  return gulp
    .src('./src/scss/styles.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist'));
}

function js() {
  return gulp.src('./src/js/*.js').pipe(uglify()).pipe(gulp.dest('dist'));
}

function copy() {
  return gulp.src('./src/*.html').pipe(gulp.dest('dist'));
}

export default gulp.parallel(gulp.series(scss, js), copy, img);
