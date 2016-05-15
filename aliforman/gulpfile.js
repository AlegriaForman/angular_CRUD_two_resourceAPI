const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');

var client = ['**.js', 'app/**/*.js', '!node_modules/**', '!build/**'];
var server = ['server/**/*.js', '!**/node_modules/**', '!**/db/*'];

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('./build'));
});

gulp.task('lint:client', () => {
  gulp.src(client)
    .pipe(eslint('app/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:server', () => {
  gulp.src(server)
    .pipe(eslint('server/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('lint', ['lint:client', 'lint:server']);
gulp.task('default', ['build:dev', 'lint']);
