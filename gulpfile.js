import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

/* to make ESM syntax work, add '"type":"module"' to your package.json, make sure you use a modern Node environment + gulp 4.
There were breaking changes from gulp 3 to gulp 4, so beware of this fact when you encounter a gulp config in a legacy project. 
See f.i. Async completion here: https://gulpjs.com/docs/en/getting-started/async-completion
*/

function img() {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/gulp/images'));
}

function scss() {
  return gulp
    .src('./src/scss/styles.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/gulp'));
}

function js() {
  return gulp.src('./src/js/*.js').pipe(uglify()).pipe(gulp.dest('dist/gulp'));
}

function copy() {
  return gulp.src('./src/*.html').pipe(gulp.dest('dist/gulp'));
}

export default gulp.parallel(gulp.series(scss, js), copy, img);
