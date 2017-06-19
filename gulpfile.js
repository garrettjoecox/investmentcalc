
const gulp = require('gulp');
const pl = require('gulp-load-plugins')();

gulp.task('serve', () => {
  pl.connect.server({
    root: '.',
    port: 9000,
  });
});

gulp.task('dev', ['watch'], () => {
  pl.connect.server({
    root: '.',
    port: 9000,
    livereload: true,
  });
});

const vendor = {
  js: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
  ],
  css: [
    'node_modules/normalize.css/normalize.css',
  ],
};

gulp.task('watch', ['src'], () => {
  gulp.watch(['src/**/*.js'], ['src:js']);
  gulp.watch(['src/**/*.scss'], ['src:css']);
});

gulp.task('src', ['src:js', 'src:css']);

gulp.task('src:js', () => {
  return gulp.src(vendor.js.concat(['src/index.js', 'src/**/*.js']))
    .pipe(pl.plumber())
    .pipe(pl.babel())
    .pipe(pl.concat('index.js'))
    .pipe(pl.ngAnnotate())
    .pipe(pl.uglify())
    .pipe(gulp.dest('dist'))
    .pipe(pl.connect.reload());
});

gulp.task('src:css', () => {
  return gulp.src(vendor.css.concat(['src/**/*.scss']))
    .pipe(pl.plumber())
    .pipe(pl.concat('index.css'))
    .pipe(pl.sass().on('error', pl.sass.logError))
    .pipe(pl.autoprefixer())
    .pipe(pl.cleanCss())
    .pipe(gulp.dest('dist'))
    .pipe(pl.connect.reload());
});
