const gulp = require('gulp');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const mongoose = require('mongoose');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
const mongoUri = 'mongodb://localhost/test_server';
var children = [];

var client = ['server.js', 'app/**/**/*.js', '!node_modules/**', '!build/**'];
var server = ['server/**/*.js', '!**/node_modules/**', '!**/db/*'];

function killCp() {
  children.forEach((child) => {
    child.kill('SIGTERM');
  });
}

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

gulp.task('webpack:karma', function() {
  return gulp.src('test/unit/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'karma_bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('webpack:protractor', () => {
  gulp.src('test/integration/**.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'pro_bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', () => {
  gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('./build'));
});

gulp.task('sass:dev', () => {
  gulp.src('app/scss/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(maps.write('./maps'))
  .pipe(gulp.dest('./build'));
});

gulp.task('mongoDb:test', (done) => {
  children.push(cp.spawn('mongod'));
  setTimeout(done, 1000);
});

gulp.task('dropTestDb', ['mongoDb:test'], (done) => {
  mongoose.connect(mongoUri, () => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });
});

gulp.task('startservers:test', (done) => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.fork('server/index', [], { env: { MONGODB_URI: mongoUri } }));
  setTimeout(done, 1000);
});

gulp.task('lint:client', () => {
  return gulp.src(client)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:server', () => {
  return gulp.src(server)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('build:dev', ['sass:dev', 'webpack:dev', 'static:dev']);
gulp.task('lint', ['lint:client', 'lint:server']);
gulp.task('test', ['webpack:protractor', 'webpack:karma']);
gulp.task('default', ['build:dev', 'lint', 'test']);
